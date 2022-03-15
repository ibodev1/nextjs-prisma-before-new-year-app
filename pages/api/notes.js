import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const notes = await prisma.notes.findMany();
  if (req.method === "GET") {
    res.json(notes);
  } else if (req.method === "POST") {
    const data = req.body;
    const saved = await prisma.notes.create({
      data: data,
    });
    res.json(saved);
  } else {
    res.json({ error: "HATALI METHOD" });
  }
}
