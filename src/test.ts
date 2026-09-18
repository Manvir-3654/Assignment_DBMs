import prisma from "./lib/prisma.js";
import {
  bookAppointment,
  cancelAllPatientAppointments,
  deleteAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
} from "./appointments.js";
import { createDoctor, deleteDoctor, getDoctor, listDoctorsBySpecialty } from "./doctors.js";
import {
  createPatient,
  deletePatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
} from "./patients.js";

async function main() {
  const existingPatient = await prisma.patient.findUnique({
    where: { email: "test.patient@example.com" },
  });
  const existingDoctor = await prisma.doctor.findUnique({
    where: { email: "dr.test@hospital.io" },
  });
  if (existingPatient) {
    await prisma.appointment.deleteMany({ where: { patientId: existingPatient.id } });
    await prisma.patient.delete({ where: { id: existingPatient.id } });
  }
  if (existingDoctor) {
    await prisma.appointment.deleteMany({ where: { doctorId: existingDoctor.id } });
    await prisma.doctor.delete({ where: { id: existingDoctor.id } });
  }

  console.log("\n── Patients ──────────────────────────");

  const patient = await createPatient({
    name: "Test Patient",
    email: "test.patient@example.com",
    phone: "9999999999",
  });
  console.log("Created:", patient.name, patient.id);

  const found = await getPatient(patient.id);
  console.log("Found:", found.name);

  const updated = await updatePatientPhone(patient.id, "8888888888");
  console.log("Updated phone:", updated.phone);

  const results = await searchPatients("Test");
  console.log("Search results:", results.length);

  console.log("\n── Doctors ───────────────────────────");

  const doctor = await createDoctor({
    name: "Dr. Test",
    specialty: "General Medicine",
    email: "dr.test@hospital.io",
  });
  console.log("Created:", doctor.name, doctor.id);

  const foundDoctor = await getDoctor(doctor.id);
  console.log("Found doctor:", foundDoctor.name);

  const specialists = await listDoctorsBySpecialty("General");
  console.log("General Medicine doctors:", specialists.length);

  console.log("\n── Appointments ──────────────────────");

  const appt = await bookAppointment(
    patient.id,
    doctor.id,
    new Date("2027-09-01T09:00:00"),
    "Initial consultation",
  );
  console.log("Booked:", appt.id, "for", appt.patient.name);

  const full = await getAppointmentFull(appt.id);
  console.log("Full fetch:", full.patient.name, "with", full.doctor.name);

  const schedule = await getDoctorUpcomingAppointments(doctor.id);
  console.log("Doctor schedule:", schedule.length, "appointment(s)");

  const cancelled = await setAppointmentStatus(appt.id, "cancelled");
  console.log("Status updated to:", cancelled.status);

  const cancelledCount = await cancelAllPatientAppointments(patient.id);
  console.log("Cancelled remaining scheduled appointments:", cancelledCount);

  console.log("\n── Cleanup ───────────────────────────");
  await deleteAppointment(appt.id);
  await deletePatient(patient.id);
  await deleteDoctor(doctor.id);
  console.log("Test data cleaned up.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
