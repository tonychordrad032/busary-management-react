package com.varsitygiene.bursarymanagementapi.utils.config.utils;

/**
 * @Author Nhlanhla Mkhize 2022-06-30
 * @REF https://www.bezkoder.com/spring-boot-file-upload/
 */

import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Log4j2
@Service
public class FilesStorageService {
    private final Path root = Paths.get("uploads");
    private final Path defaultPath = Paths.get("defaults");

    public void init() {
        try {
            if(!Files.exists(root)) {
                Files.createDirectory(root);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public Path save(MultipartFile file) {
        try {
            Path cc = this.root.resolve(file.getOriginalFilename().replaceAll(" ","_"));
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename().replaceAll(" ","_")));
            return  cc;
        } catch (Exception e) {
            //throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
            log.warn("Could not store the file. Error: " + e.getMessage());
            return null;
        }
    }

  public Path save(MultipartFile file, String fileName) {
    try {
      Path cc = this.root.resolve(fileName);
      Files.copy(file.getInputStream(), this.root.resolve(fileName));
      return  cc;
    } catch (Exception e) {
      //throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
      log.warn("Could not store the file. Error: " + e.getMessage());
      return null;
    }
  }


    public void saveBase64(String base64) {
        try {
            byte[] data = Base64.decodeBase64(base64);
            try (OutputStream stream = new FileOutputStream("uploads/")) {
                stream.write(data);
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

  public Resource loadDefault(String filename) {
    try {
      Path file = defaultPath.resolve(filename);
      Resource resource = new UrlResource(file.toUri());
      if (resource.exists() || resource.isReadable()) {
        return resource;
      } else {
        throw new RuntimeException("Could not read the file!");
      }
    } catch (MalformedURLException e) {
      throw new RuntimeException("Error: " + e.getMessage());
    }
  }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}
