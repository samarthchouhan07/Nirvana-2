var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";
export function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { searchParams } = new URL(req.url);
            const url = searchParams.get("url");
            if (!url) {
                return NextResponse.json({ error: "URL parameter is required." }, { status: 400 });
            }
            const buffer = yield fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
                return Buffer.from(yield res.arrayBuffer());
            }));
            const { base64 } = yield getPlaiceholder(buffer);
            return NextResponse.json(base64);
        }
        catch (error) {
            return NextResponse.json({ error: error });
        }
    });
}
