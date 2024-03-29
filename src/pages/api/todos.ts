import prisma from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // middlewareは難しかったので、ここで認証を行う
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;
    if (userId === undefined) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
      const result = await prisma.todos.findMany({
        where: {
          userId,
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session?.user?.id;
      if (userId === undefined) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ msg: "text is required" });
      }
      const result = await prisma.todos.create({
        data: { text, completed: false, userId },
      });
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  if (req.method === "PATCH") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session?.user?.id;
      if (userId === undefined) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const { id, text, completed } = req.body;
      if (!id || !text || completed === undefined) {
        return res
          .status(400)
          .json({ msg: "id, text, completed are required" });
      }
      const result = await prisma.todos.update({
        where: { id, userId },
        data: { text, completed },
      });
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session?.user?.id;
      if (userId === undefined) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "id is required" });
      }
      const result = await prisma.todos.delete({
        where: { id, userId },
      });
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  return res.status(405).json({ msg: "wrong method" });
}
