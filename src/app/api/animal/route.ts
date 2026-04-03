import { createAnimal, updateAnimal } from "../../../../webapp/server/mongodb/actions/animalActions.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const animal = await createAnimal(body);
    return NextResponse.json(animal, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "Missing animal id" }, { status: 400 });
    const animal = await updateAnimal(id, data);
    if (!animal) return NextResponse.json({ error: "Animal not found" }, { status: 400 });
    return NextResponse.json(animal, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
