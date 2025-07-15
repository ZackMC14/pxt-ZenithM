//% color="#AA278D" weight=100 icon="\uf1b9"
//% block="ZenithMotor"
namespace ZenithMotor {
    export enum Motor {
        //% block="M1"
        M1 = 0,
        //% block="M2"
        M2 = 1,
        //% block="M3"
        M3 = 2,
        //% block="M4"
        M4 = 3
    }

    export enum Direction {
        //% block="forward"
        Forward = 0,
        //% block="reverse"
        Reverse = 1,
        //% block="stop"
        Stop = 2
    }

    const motorPins: [DigitalPin, AnalogPin][] = [
        [DigitalPin.P13, AnalogPin.P14],
        [DigitalPin.P15, AnalogPin.P16],
        [DigitalPin.P1, AnalogPin.P8],
        [DigitalPin.P2, AnalogPin.P12]
    ];

    //% blockId="zenithMotor_run"
    //% block="run motor %motor direction %dir speed %speed"
    //% speed.min=0 speed.max=255
    //% weight=90
    export function run(motor: Motor, dir: Direction, speed: number): void {
        const [dirPin, pwmPin] = motorPins[motor];
        if (dir == Direction.Stop || speed == 0) {
            pins.digitalWritePin(dirPin, 0);
            pins.analogWritePin(pwmPin, 0);
        } else {
            pins.digitalWritePin(dirPin, dir == Direction.Forward ? 1 : 0);
            pins.analogWritePin(pwmPin, speed);
        }
    }

    //% blockId="zenithMotor_stopAll"
    //% block="stop all motors"
    //% weight=80
    export function stopAll(): void {
        for (const [dirPin, pwmPin] of motorPins) {
            pins.digitalWritePin(dirPin, 0);
            pins.analogWritePin(pwmPin, 0);
        }
    }
}