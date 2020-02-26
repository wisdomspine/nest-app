import { IsPhoneNumber, IsMobilePhone, IsEmail, IsDate, IsDateString, IsBoolean, IsBooleanString, IsCurrency } from "class-validator";
export class TestDto {

    @IsCurrency(
        {
            allow_decimal: true,
            allow_negatives: false
        }
    )
    no: boolean;
}