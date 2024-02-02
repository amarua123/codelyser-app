package com.accolite.codelyzer.utils;

import com.accolite.codelyzer.model.Group;
import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.requestbody.QuestionBody;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
@Service
public class QuesExcelReader {
    public static List<QuestionBody> readFromExcel(InputStream fileInputStream) throws IOException {
        List<QuestionBody> entities = new ArrayList<>();
//        int counter = 1;
//        String filePath = "src/main/resources/quesSample.xlsx";
        try (Workbook workbook = WorkbookFactory.create(fileInputStream)) {
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row
            while (rowIterator.hasNext() ) {
//                System.out.println(rowIterator.hasNext());
                Row row = rowIterator.next();
                if (row != null && row.getCell(0)!=null){
                    QuestionBody entity = new QuestionBody();
                        String description = row.getCell(0).getStringCellValue();
                    String option1 = row.getCell(1).getStringCellValue();
                    String option2 = row.getCell(2).getStringCellValue();
                    String option3 = row.getCell(3).getStringCellValue();
                    String option4 = row.getCell(4).getStringCellValue();

                    entity.setDescription(description);
                    entity.setOptions(new ArrayList<>(Arrays.asList(option1, option2, option3, option4)));
                    entity.setQuestionType("MCQ");

//                    entity.setGroupName("BFS"); // Assuming Group name is in the third column
                    entity.setAnswers(new ArrayList<>(Arrays.asList(row.getCell(5).getStringCellValue())));

                    List<String> tagSet = new ArrayList<>();
                    String[] tagsArray = row.getCell(6).getStringCellValue().split(",");
                    for (String tagName : tagsArray) {
                        tagSet.add(tagName.trim());
                    }

                    entity.setTagSet(tagSet);

                    entities.add(entity);

                }
                // Read and set TagSet
//                Set<Tag> tagSet = new HashSet<>();
//                String[] tagsArray = row.getCell(3).getStringCellValue().split(","); // Assuming tags are in the fourth column separated by commas
//                for (String tagName : tagsArray) {
//                    Tag tag = new Tag();
//                    tag.setTagName(tagName.trim());
//                    tagSet.add(tag);
//
//                }
//
//                entity.setTagSet(tagSet);
//
//                // Read and set Options
//                List<Option> options = new ArrayList<>();
//                // Assuming option values are in the fifth column separated by commas
//                String[] optionsArray = row.getCell(4).getStringCellValue().split(",");
//                for (String optionValue : optionsArray) {
//                    Option option = new Option();
//                    option.setOptionText(optionValue.trim());
//                    option.setQuestion(entity);
//                    options.add(option);
//                }
//                entity.setOptions(options);
//
//                // Read and set Answers
//                List<Answer> answers = new ArrayList<>();
//                // Assuming answer values are in the sixth column separated by commas
//                String[] answersArray = row.getCell(5).getStringCellValue().split(",");
//                for (String answerValue : answersArray) {
//                    Answer answer = new Answer();
//                    answer.setSelectedAnswer(answerValue.trim());
//                    answer.setQuestion(entity);
//                    answers.add(answer);
//                }
//
            }
            return entities;
        }




    }

//    private static Tag getOrCreateTag(String tagName) {
//
//        Optional<Tag> existingTag = tagService.findByTagName(tagName);
//
//        return existingTag.orElseGet(() -> {
//            Tag newTag = new Tag();
//            newTag.setTagName(tagName);
//            return tagService.save(newTag); // Change 'save' to an appropriate method name in your TagService
//        });
//    }

//    private static Tag getOrCreateTag(String tagName) {
//         Optional<Tag> existingTag = tagService.findByTagName(tagName);
//
//        return existingTag.orElseGet(() -> {
//            Tag newTag = new Tag();
//            newTag.setTagName(tagName);
//            return tagService.save(newTag);
//        });
//    }
}