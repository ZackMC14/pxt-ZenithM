//% color="#AA278D" weight=100 icon="\uf1b9"
//% block="ZenithM"
namespace ZenithM {

    //% block="motor %name"
    export enum Motor {
        //% block="M1 (P13,P14)"
        M1 = 0,
        //% block="M2 (P15,P16)"
        M2 = 1,
        //% block="M3 (P1,P8)"
        M3 = 2,
        //% block="M4 (P2,P12)"
        M4 = 3
    }

    //% block="direction %dir"
    export enum Direction {
        //% block="forward"
        Forward = 0,
        //% block="reverse"
        Reverse = 1,
        //% block="stop"
        Stop = 2
    }

    // มอเตอร์แต่ละตัวแมปกับพิน: [ทิศ, PWM]
    const motorPins: [DigitalPin, AnalogPin][] = [
        [DigitalPin.P13, AnalogPin.P14],  // M1
        [DigitalPin.P15, AnalogPin.P16],  // M2
        [DigitalPin.P1, AnalogPin.P8],    // M3
        [DigitalPin.P2, AnalogPin.P12]    // M4
    ];

    /**
     * สั่งให้มอเตอร์หมุนไปข้างหน้า ถอยหลัง หรือหยุด ด้วยความเร็วที่กำหนด
     */
    //% block="run motor %motor|direction %dir|speed %speed"
    //% speed.min=0 speed.max=255
    //% group="Motor Control"
    export function runMotor(motor: Motor, dir: Direction, speed: number): void {
        let [dirPin, pwmPin] = motorPins[motor];

        if (dir == Direction.Stop || speed == 0) {
            pins.digitalWritePin(dirPin, 0);
            pins.analogWritePin(pwmPin, 0);
        } else if (dir == Direction.Forward) {
            pins.digitalWritePin(dirPin, 1);
            pins.analogWritePin(pwmPin, speed);
        } else if (dir == Direction.Reverse) {
            pins.digitalWritePin(dirPin, 0);
            pins.analogWritePin(pwmPin, speed);
        }
    }

    /**
     * หยุดมอเตอร์ทุกตัว
     */
    //% block="stop all motors"
    //% group="Motor Control"
    export function stopAll(): void {
        for (let [dirPin, pwmPin] of motorPins) {
            pins.digitalWritePin(dirPin, 0);
            pins.analogWritePin(pwmPin, 0);
        }
    }

    /**
     * สั่งหยุดเฉพาะมอเตอร์ที่ระบุ
     */
    //% block="stop motor %motor"
    //% group="Motor Control"
    export function stopMotor(motor: Motor): void {
        let [dirPin, pwmPin] = motorPins[motor];
        pins.digitalWritePin(dirPin, 0);
        pins.analogWritePin(pwmPin, 0);
    }

    /**
     * สั่งให้มอเตอร์หมุนไปข้างหน้า
     */
    //% block="motor %motor forward at speed %speed"
    //% speed.min=0 speed.max=255
    //% group="Motor Control"
    export function forward(motor: Motor, speed: number): void {
        runMotor(motor, Direction.Forward, speed);
    }

    /**
     * สั่งให้มอเตอร์หมุนถอยหลัง
     */
    //% block="motor %motor reverse at speed %speed"
    //% speed.min=0 speed.max=255
    //% group="Motor Control"
    export function reverse(motor: Motor, speed: number): void {
        runMotor(motor, Direction.Reverse, speed);
    }
}
