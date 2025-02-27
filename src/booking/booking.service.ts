import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Booking from '../entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}
}
