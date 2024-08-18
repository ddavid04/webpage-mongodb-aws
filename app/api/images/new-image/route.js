'use server';
import {NextResponse} from "next/server";
import {S3Client} from "@aws-sdk/client-s3";
import {Buffer} from "buffer";
import {Upload} from "@aws-sdk/lib-storage";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY}
})

async function uploadFileToS3(file, fileName, key){
    const fileBuffer = file;
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: "image/jpeg",
    }

    const upload = new Upload({
        client: s3Client,
        params: params,
    })
    try {
        await upload.done();
        console.log('File uploaded successfully:', fileName);
    } catch (uploadError) {
        console.error('Error during upload:', uploadError);
        throw uploadError;
    }

    return fileName;
}

export async function POST(request) {


    try{

        const formData = await request.formData()
        const file = formData.get('image');
        const imgName = formData.get('imageName')
        if(!file){
            return NextResponse.json({message: 'Image not found'});
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name, imgName)

        return NextResponse.json({message: 'Image uploaded successfully.'});

    }catch(error){
        return NextResponse.json({error: "Something went wrong. File not uploaded"})

    }

}