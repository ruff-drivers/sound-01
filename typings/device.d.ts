export declare class SoundSensor extends RuffDevice {
    on(event: 'receive', listener: () => void): this;

    /**
     * Enable the SoundSensor
     */
    enable(): void;

    /**
     * Disable the SoundSensor
     */
    disable(): void;

    /**
     * Property which represents the listen interval of SoundSensor
     */
    interval: number;

}

export default SoundSensor;
