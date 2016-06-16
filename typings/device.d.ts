export declare class SoundSensor extends RuffDevice {
    /**
     * Enable the SoundSensor.
     * @param callback - The callback.
     */
    enable(callback: (error: Error) => void): void;

    /**
     * Disable the SoundSensor.
     * @param callback - The callback.
     */
    disable(callback: (error: Error) => void): void;

    /**
     * Property which represents the listen interval of SoundSensor.
     */
    interval: number;

    /**
     * receive event
     */
    on(event: 'receive', listener: () => void): this;
}

export default SoundSensor;
