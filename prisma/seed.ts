import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
/*     await prisma.user.createMany({
      data: [{ email: "aleatorio@gmail.com", password: "123456" }, {email: "fulano@gmail.com", password: "123456"}],
    });
    await prisma.family.createMany({
      data: [{name: 'Reis'}, {name: 'Fonseca'}]
    });
    await prisma.enrollment.createMany({
      data: [{ familyId: 1, userId: 1, name: 'aleatorio' }, { familyId: 1, userId: 2, name: 'fulano' }],
    }); */
    
    await prisma.task.createMany({
      data: [{name: 'alimentar os gatos', when: '2023-05-05T00:00:00.000Z', familyId: 1, status: 'pending'}, {name: 'alimentar os cachorros', when: '2023-05-08T00:00:00.000Z', familyId: 1, status: 'pending'}]
    });
    await prisma.taskMembers.createMany({
      data: [{taskId: 1, userId: 1}, {taskId: 1, userId: 2}, {taskId: 2, userId: 2}]
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });