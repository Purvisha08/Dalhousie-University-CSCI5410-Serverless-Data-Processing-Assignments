package part_b;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s3BucketName = null;
        while (s3BucketName == null || s3BucketName.trim().isEmpty()) {
            System.out.println("Enter S3 Bucket Name");
            s3BucketName = scanner.nextLine();
        }
        CreateS3Bucket createS3Bucket = new CreateS3Bucket();
        createS3Bucket.createBucket(s3BucketName);
        createS3Bucket.uploadFile(s3BucketName);
    }
}
