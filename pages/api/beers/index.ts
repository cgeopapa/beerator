import {NextApiRequest, NextApiResponse} from "next";
import formidable from "formidable";
import * as fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();
            const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(function (resolve, reject) {
                form.parse(req, async function (err, fields, files) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({fields: fields, files: files});
                })
            })
            await saveFile(files.photoUrl);
            res.status(200).json({});
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
}

const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${file.name}.png`, data);
    fs.unlinkSync(file.filepath);
    return;
};
