package com.accolite.codelyzer.utils;

import com.accolite.codelyzer.model.Candidate;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CandidateExcelReader
{
    public static List<Candidate> processExcelFile(InputStream fileInputStream) throws IOException {
        List<Candidate> Candidates = new ArrayList<>();


        try (Workbook workbook = WorkbookFactory.create(fileInputStream)){
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            // Skip header row
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                if(row == null || row.getCell(0) == null || row.getCell(1) == null) continue;
                if(row.getCell(0).getStringCellValue().trim().isEmpty()) continue;
                if(row.getCell(1).getStringCellValue().trim().isEmpty()) continue;
                Candidate candidate = new Candidate();
                candidate.setCandidateName(row.getCell(1).getStringCellValue());
                candidate.setCandidateEmail(row.getCell(0).getStringCellValue());
                Candidates.add(candidate);
            }
            return Candidates;
        }
    }
}
