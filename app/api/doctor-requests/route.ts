let data = [
  {
    id: 1,
    name: "د. أحمد السيد",
    specialty: "قلب",
    experience: 12,
    date: "2025-10-13",
    status: "pending",
  },
  {
    id: 2,
    name: "د. محمد حسن",
    specialty: "أعصاب",
    experience: 7,
    date: "2025-10-14",
    status: "approved",
  },
];

export async function GET() {
  return Response.json(data);
}