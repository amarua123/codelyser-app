package com.accolite.codelyzer.utils;

import com.accolite.codelyzer.exceptions.TestSetNotFoundException;
import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.model.TestSet;
import com.accolite.codelyzer.repository.TestCredentialsRepo;
import com.accolite.codelyzer.repository.TestSetRepo;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

import static java.lang.Long.parseLong;

public class ExcelReaderUtil {
    public static List<TestCredentials> readCandidatesFromExcel(InputStream fileInputStream, TestSetRepo testSetRepo, TestCredentialsRepo testCredentialsRepo) throws IOException,
            NumberFormatException, TestSetNotFoundException {
        List<TestCredentials> testCredentials = new ArrayList<>();

        try (Workbook workbook = WorkbookFactory.create(fileInputStream)) {
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                if (row == null || row.getCell(0) == null || row.getCell(0).getStringCellValue().trim().isEmpty()) {
                    continue;
                }
                if (row.getCell(1) == null || row.getCell(1).getStringCellValue().trim().isEmpty()) {
                    continue;
                }
                if (row.getCell(2) == null || row.getCell(2).getStringCellValue().trim().isEmpty()) {
                    continue;
                }
                if(testCredentialsRepo.existsByEmailAddress(row.getCell(0).getStringCellValue())){
                    continue;
                }
                TestCredentials newTestCredential = new TestCredentials();
                newTestCredential.setEmailAddress(row.getCell(0).getStringCellValue());
//                newTestCredential.setLinkSentStatus(row.getCell(1).getBooleanCellValue());
//                LocalDateTime expiryDate = convertDateToLocalDateTime(row.getCell(2).getDateCellValue());
//                newTestCredential.setExpiryDate(row.getCell(1).getStringCellValue());
//                LocalDateTime startTime = convertDateToLocalDateTime(row.getCell(3).getDateCellValue());
//                newTestCredential.setStartTime(row.getCell(2).getStringCellValue());
                newTestCredential.setName(row.getCell(1).getStringCellValue());
                newTestCredential.setLinkSentStatus(false);
                Optional<TestSet> testSet = testSetRepo.findById(parseLong(row.getCell(2).getStringCellValue()));
                if(testSet.isEmpty()){
                    throw new TestSetNotFoundException("No test found with this ID");
                }
                newTestCredential.setTestSet(testSet.get());
                List<Question> questions = new ArrayList<>();
                newTestCredential.setQuestions(questions);
                testCredentials.add(newTestCredential);
            }
            return testCredentials;

        }
    }

    //    foe converting date to local date
    public static LocalDateTime convertDateToLocalDateTime(Date date) {
        Instant instant = date.toInstant();
        return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    }
}

