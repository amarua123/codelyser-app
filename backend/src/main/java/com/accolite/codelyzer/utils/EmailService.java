package com.accolite.codelyzer.utils;
import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.repository.TestCredentialsRepo;
import com.accolite.codelyzer.repository.TestSetRepo;
import com.accolite.codelyzer.requestbody.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.lang.*;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import java.util.List;
import java.util.Properties;
@Service
public class EmailService {

    @Autowired
    private TestCredentialsRepo testCredentialsRepo;
    @Autowired
    private TestSetRepo testSetRepo;

    @Value("${mail.smtp.host}")
    private String host;

    @Value("${mail.smtp.port}")
    private String port;

    @Value("${mail.smtp.ssl.enable}")
    private String sslEnable;

    @Value("${mail.smtp.auth}")
    private String auth;

    @Value("${mail.sender.username}")
    private String username;

    @Value("${mail.sender.password}")
    private String password;

    public boolean sendEmail(String subject, String message, String to){
        boolean f = false;
        String from = username;

//        String host="smtp.gmail.com";
        Properties properties = System.getProperties();
        System.out.println("PROPERTIES"+properties);

        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.ssl.enable", sslEnable);
        properties.put("mail.smtp.auth", auth);


        Session session=Session.getInstance(properties, new Authenticator(){
            @Override
            protected PasswordAuthentication getPasswordAuthentication(){
                return new PasswordAuthentication(username, password);
            }
        });

        session.setDebug(true);

        MimeMessage m= new MimeMessage(session);
        try{
            m.setFrom(from);

            m.addRecipient(Message.RecipientType.TO,new InternetAddress(to));

            m.setSubject(subject);

            m.setText(message);

            Transport.send(m);

            testCredentialsRepo.updateLinkSentStatusByEmail(to);
            System.out.println("Sent Success.....");
            f = true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return f;
    }




    public boolean sendBulkEmails(List<EmailRequest> emailRequests) {
        boolean allSentSuccessfully = true;

        for (EmailRequest request : emailRequests) {
            boolean result = sendEmail(request.getSubject(), request.getMessage(), request.getTo());
            TestCredentials testCredentials;
            if(testCredentialsRepo.existsByEmailAddress(request.getTo())){
                testCredentials = testCredentialsRepo.findByEmailAddress(request.getTo());
            }else{
                testCredentials = new TestCredentials();
                testCredentials.setEmailAddress(request.getTo());
            }

            testCredentials.setTestSet(testSetRepo.findByTestSetTitle(request.getTestTitle()).get());
            testCredentials.setLinkSentStatus(true);
            testCredentialsRepo.save(testCredentials);
            if (!result) {
                testCredentials.setLinkSentStatus(false);
                // If any email fails to send, set the flag to false
                allSentSuccessfully = false;
                testCredentials.setLinkSentStatus(false);
            }
        }

        return allSentSuccessfully;
    }



}