import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDto>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Equipe TamoJunto <tamojunto@gmail.com.br>',
      subject: 'Seja bem vindo(a)!',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    Logger.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    Logger.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    Logger.log(`On Active ${job.name}`);
  }
}

export default SendMailConsumer;
