package com.accolite.codelyzer.utils;

import com.accolite.codelyzer.model.Option;
import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.repository.QuestionRepo;
import com.accolite.codelyzer.requestbody.CandidateBody;
import com.accolite.codelyzer.requestbody.QuestionBody;
import lombok.Data;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class PdfServiceUtil {
    public static String checker(Option option, Character tickedCh, Character ansCh){
        if(tickedCh == 'Z'){
            return """
                    <label> %s </label>
                    """.formatted(option.getOptionText());
        }
        if(ansCh.equals(tickedCh)){
            if(ansCh.equals(option.getAnsCh())){ //correct ans so --> green
                return """
                    <label style="background-color: %s;"> %s </label>
                    """.formatted(greenColor, option.getOptionText());
            }else{
                return """
                    <label> %s </label>
                    """.formatted(option.getOptionText());
            }
        }

        if(option.getAnsCh().equals(ansCh)){
            return """
                    <label style="background-color: %s;"> %s </label>
                    """.formatted(greenColor, option.getOptionText());
        }else if(option.getAnsCh().equals(tickedCh)){    //wrong ans so --> red
            return """
                <label style="background-color: %s;"> %s </label>
                """.formatted(redColor, option.getOptionText());
        }
        return """
                    <label> %s </label>
                    """.formatted(option.getOptionText());
    }
//    public static void convertHtmlToPdf(String html, String outputPath) throws Exception {
//        try (OutputStream os = new FileOutputStream(outputPath)) {
//            ITextRenderer renderer = new ITextRenderer();
//            renderer.setDocumentFromString(html);
//            renderer.layout();
//            renderer.createPDF(os);
//        }
//    }
    public static byte[] convertHtmlToPdf(String html) throws Exception {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(baos);
            return baos.toByteArray();
        }
    }
    public static byte[] getReport(CandidateBody candidateBody, List<Long> questionIds, List<Option> ticks, Long score, String tetSetTitle, QuestionRepo questionRepo){
        StringBuilder sb = new StringBuilder();

        if(questionIds.size() != ticks.size()){
            return new byte[0];
        }
        String candidateDetails = """
                <div class="details-container">
                    <h2 style="text-align: center;">Candidate Details</h2>
                    <table>
                      <tr>
                        <th>Attribute</th>
                        <th>Details</th>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>%s</td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>%s</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>%s</td>
                      </tr>
                      <tr>
                        <td>Test Details</td>
                        <td> %s </td>
                      </tr>
                      <tr>
                        <td>Marks Obtained</td>
                        <td>%s out of %s</td>
                      </tr>
                    </table>
                  </div>
                """.formatted(candidateBody.getName(), candidateBody.getPhoneNo(), candidateBody.getEmail(), tetSetTitle, score, questionIds.size());
                for(int i = 0; i < questionIds.size(); i++){
                    Optional<Question> questionIfPresent = questionRepo.findById(questionIds.get(i));
                    if(questionIfPresent.isEmpty()) continue;
                    Question question = questionIfPresent.get();

                    Character ticked = ticks.get(i).getAnsCh();
                    Character corAns = question.getAnswer().charAt(0);
                    String option1 = checker(question.getOptions().get(0), ticked, corAns);
                    String option2 = checker(question.getOptions().get(1), ticked, corAns);
                    String option3 = checker(question.getOptions().get(2), ticked, corAns);
                    String option4 = checker(question.getOptions().get(3), ticked, corAns);
                    sb.append("""
                 <div class="question-container">
                   <h2> %s </h2>
                   <ul>
                     <li> %s </li>
                     <li> %s </li>
                     <li> %s </li>
                     <li> %s </li>
                   </ul>
                 </div>
                 """.formatted(
                            question.getDescription(),
                            option1,
                            option2,
                            option3,
                            option4
                            ));
                };

        try {
            return convertHtmlToPdf(head + candidateDetails + sb.toString() + tail);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
//    public static void main(String[] args) throws FileNotFoundException {
//        try {
//            // Replace this with your HTML content
//            String question = "Which of the following is a programming language?";
//            String option1 = "HTML";
//            String option2 = "CSS";
//            String option3 = "JavaScript";
//            String option4 = "Photoshop";
//
//
//            // Specify the output path for the PDF file
//            String outputPath = "src\\main\\resources\\Data123.pdf";
//            String htmlContent = questionTemplate(question, option1, option2, option3, option4, "Photoshop", "JavaScript");
//            // Convert HTML to PDF
//            convertHtmlToPdf(htmlContent, outputPath);
//
//            System.out.println("PDF generated successfully at: " + outputPath);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
    static String head = """
              <!DOCTYPE html>
             <html lang="en">
             <head>
               <style>
                 body {font-family: 'Arial', sans-serif;
                   margin: 0;padding: 0;display: flex;align-items: center;
                   justify-content: center;min-height: 100vh;
                 }
                 .question-container {
                   background-color: #fff;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                   width: 100vw;padding: 20px;text-align: left;
                 }
                 h2 {color: #333;}
                 ul {list-style-type: none;padding: 0;}
                 li {margin-bottom: 10px;}
                 label {display: block;background-color: #e0e0e0;
                   padding: 10px;border-radius: 5px;cursor: pointer;
                   transition: background-color 0.3s ease;
                 }
                 
                 .details-container {
                         background-color: #fff;
                         border-radius: 8px;
                         width: 600px;
                         padding: 20px;
                         text-align: left;
                         margin:auto;
                       }
                       table {
                         width: 100%;
                         border-collapse: collapse;
                         margin-top: 15px;
                       }
                       th, td {
                         border: 1px solid #ddd;
                         padding: 10px;
                         text-align: left;
                       }
                       th {
                         background-color: #4CAF50;
                         color: #fff;
                       }
               </style>
             </head>
            <body>
              """;
    static String tail = """
            </body></html>
            """;
    static  String greenColor = "#6add6e";
    static String redColor = "#f25d5d";
}
