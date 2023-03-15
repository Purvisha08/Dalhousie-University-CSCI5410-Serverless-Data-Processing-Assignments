package part_b;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.Bucket;

import java.io.File;
import java.nio.file.Paths;
import java.util.List;

public class CreateS3Bucket {
    public AmazonS3 awsConnection() {
        BasicSessionCredentials basicSessionCredentials = new BasicSessionCredentials
                ("ASIA5HM7NXUJOXCFEUPB",
                        "YUvIRfsIbcFOMLtuTrnr+J4tAoK0bdqRKPKNnzma",
                        "FwoGZXIvYXdzECwaDMjVk691tnEjQRmTdSLAAWdndVS5F0c1A6YpFkDvoZ+j5IuAk" +
                                "8riEP87pjNQuhKBBJNTimD8rwBx3l0WB5cJwaXinXKhLJPpElDyVsd2a0rbE4ih0id8" +
                                "fVslerVC7L65dwuRs10n3JbxQ1W47hmraEoqz53o8XUCmWEXBebUp4drVrM4DTtV3Un" +
                                "e+PDXMK/XKxNd+wLiqSgtfsHDkTjvs78X3L593kdUarrstbX76WCA/0K5SFvSh8FZXqu" +
                                "JP72vkKoVk6LB0KlToB8KGPfyJiij5q2aBjItAzChpJ317xoYdr5SQ/jZZPYWrb47gIb" +
                                "HVXSUHxEvu3nhDdlD7G8MpEm/N7Zx");


        AmazonS3 amazonS3object = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(basicSessionCredentials))
                .withRegion(Regions.US_EAST_1)
                .build();
        return amazonS3object;
    }
    public void createBucket(String s3BucketName){
        boolean flag = false;
        List<Bucket> bucketList = awsConnection().listBuckets();
        for (Bucket bucket: bucketList){
            if(bucket.getName().equals(s3BucketName)){
                flag = true;
                break;
            }
        }
        if (flag){
            System.out.println(s3BucketName + " already present....");
        }else {
            try {
                System.out.println(s3BucketName + " - Creating Bucket");
                awsConnection().createBucket(s3BucketName);
                System.out.println(s3BucketName+ " - Bucket Created Successfully");
            }catch (AmazonS3Exception e){
                e.getErrorMessage();
            }
        }
    }
    public void uploadFile(String s3BucketName) {
        String defaultPath = "./src/main/java/part_b/";
        String htmlFileName = "index.html";
        String fileName = Paths.get(defaultPath+htmlFileName).getFileName().toString();
        try {
            awsConnection().putObject(s3BucketName, fileName, new File(defaultPath+htmlFileName));
            System.out.println("Index.html file uploaded successfully to the AWS S3 bucket");
        } catch (AmazonServiceException e) {
            e.getErrorMessage();
        }
    }
}
