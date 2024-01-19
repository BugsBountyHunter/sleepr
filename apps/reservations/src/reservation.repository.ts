import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDocument } from 'apps/reservations/src/models/reservation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
