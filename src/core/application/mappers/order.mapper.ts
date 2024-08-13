import { ProductOrderMapper } from '@Infrastructure/typeorm/mappers/product-order.mapper';
import {
  CreateOrderEntity,
  CreateProductOrderEntity,
} from 'src/core/domain/entities/create-order.entity';
import { OrderEntity } from 'src/core/domain/entities/order.entity';
import { CreateOrderRequestDto } from '../dtos/request/create-order.request.dto';
import { OrderResponseDto } from '../dtos/response/order.respose.dto';

export class OrderMapper {
  static toCreateOrderEntity(dto: CreateOrderRequestDto): CreateOrderEntity {
    const productOrders = dto.productOrders.map((productOrderDto) => {
      return new CreateProductOrderEntity(
        productOrderDto.productId,
        productOrderDto.quantity,
      );
    });

    return new CreateOrderEntity(productOrders);
  }

  static toResponseDto(orderEntity: OrderEntity): OrderResponseDto {
    const productOrders = orderEntity.productsOrder.map(
      ProductOrderMapper.toEntity,
    );

    return {
      id: orderEntity.id,
      totalPrice: orderEntity.totalPrice.getValue(),
      user: orderEntity.user,
      paymentStatus: orderEntity.paymentStatus,
      orderStatus: orderEntity.orderStatus,
      createdAt: orderEntity.createdAt,
      updatedAt: orderEntity.updatedAt,
      productOrders: productOrders,
    };
  }
}
