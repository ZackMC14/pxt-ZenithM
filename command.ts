//% color="#AA278D" weight=100 icon="\uf1b9"
//% block="ZenithM"
namespace ZenithM {

    export enum Motor {
        M1 = 0, // P13, P14
        M2 = 1, // P15, P16
        M3 = 2, // P1, P8
        M4 = 3  // P2, P12
    }

    export enum Direction {
        //% block="forward"
        Forward = 0,
        //% block="reverse"
        Reverse = 1,
        //% block="stop"
        Stop = 2
    }

    // Each motor: [dirPin, pwmPin]
    const motorPins: [DigitalPin, AnalogPin][] = [
        [DigitalPin.P13, AnalogPin.P14], // M1
        [DigitalPin.P15, AnalogPin.P16], // M2
        [DigitalPin.P1, AnalogPin.P8],   // M3
        [DigitalPin.P2, AnalogPin.P12]   // M4
    ]

    /**
     * Control a motor's direction and speed using DIR + PWM pins.
     */
    //% blockId="customMotor_runMotor"
    //% block="motor %motor direction %dir speed %speed"
    //% speed.min=0 speed.max=255
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
     * Stop all motors
     */
    //% blockId="customMotor_stopAll"
    //% block="stop all motors"
    export function stopAll(): void {
        for (let [dirPin, pwmPin] of motorPins) {
            pins.digitalWritePin(dirPin, 0);
            pins.analogWritePin(pwmPin, 0);
        }
    }
}
