import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
    /*   const user = await prisma.user.create({
      data:{
        email: "aleatorio2@gmail.com",
        password: "aleatorio"
      }
    }) */
    await prisma.user.createMany({
        data: [{ email: "aleatorio2@gmail.com", password: "aleatorio" }],
    });
}
