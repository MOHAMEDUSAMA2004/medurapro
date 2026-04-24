let data = [
  { id: 1, status: "pending" },
  { id: 2, status: "approved" },
];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const id = Number(params.id);

  data = data.map((d) =>
    d.id === id ? { ...d, status: body.status } : d
  );

  return Response.json({ success: true });
}