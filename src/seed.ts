import prisma from "./lib/prisma.js";

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  const [drPriya, drVikram] = await Promise.all([
    prisma.doctor.create({ data: { name: "Dr. Priya Sharma", specialty: "Cardiology", email: "priya.sharma@hospital.io" } }),
    prisma.doctor.create({ data: { name: "Dr. Vikram Rao", specialty: "Neurology", email: "vikram.rao@hospital.io" } }),
  ]);
  const [aditi, rahul] = await Promise.all([
    prisma.patient.create({ data: { name: "Aditi Mehra", email: "aditi@example.com", phone: "9876543210", dateOfBirth: new Date("1990-04-12") } }),
    prisma.patient.create({ data: { name: "Rahul Singh", email: "rahul@example.com" } }),
  ]);

  await prisma.appointment.createMany({
    data: [
      { appointmentDate: new Date("2027-08-15T10:00:00Z"), notes: "Annual cardiac checkup", patientId: aditi.id, doctorId: drPriya.id },
      { appointmentDate: new Date("2027-08-16T14:30:00Z"), patientId: rahul.id, doctorId: drVikram.id },
    ],
  });
  console.log("Seed complete: 2 doctors, 2 patients, 2 appointments.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
