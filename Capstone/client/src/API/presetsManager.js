import { createAuthHeaders } from '../API/userManager';
import { getUser } from './userManager';

const authHeader = createAuthHeaders();
var userId = getUser();

export default {
    getAllPresets() {
        return fetch('/api/v1/presets', {
            headers: authHeader
        })
            .then(result => result.json())
    },
    getPreset(id) {
        return fetch(`/api/v1/presets/${id}`, {
            headers: authHeader
        })
            .then(result => result.json())
    },
    postPreset(settings) {
        return fetch('/api/v1/presets', {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify({
                // UserId: "ome user id",
                MasterTuneValue: settings.masterTune[0],
                MasterTuneDegrees: settings.masterTune[1],
                GlideAmountValue: settings.glideAmount[0],
                GlideAmountDegrees: settings.glideAmount[1],
                ModulationMixValue: settings.modulationMix[0],
                ModulationMixDegrees: settings.modulationMix[1],
                ModulationSourceA: settings.modulationSourceA,
                ModulationSourceB: settings.modulationSourceB,
                OscillatorModulation: settings.oscillatorModulation,
                Oscillation3Control: settings.oscillation3Control,
                Oscillator1RangeValue: settings.oscillator1Range[0],
                Oscillator1RangeDegrees: settings.oscillator1Range[1],
                Oscillator2RangeValue: settings.oscillator2Range[0],
                Oscillator2RangeDegrees: settings.oscillator2Range[1],
                Oscillator3RangeValue: settings.oscillator3Range[0],
                Oscillator3RangeDegrees: settings.oscillator3Range[1],
                Oscillator2FrequencyValue: settings.oscillator2Frequency[0],
                Oscillator2FrequencyDegrees: settings.oscillator2Frequency[1],
                Oscillator3FrequencyValue: settings.oscillator3Frequency[0],
                Oscillator3FrequencyDegrees: settings.oscillator3Frequency[1],
                Oscillator1WaveformValue: settings.oscillator1Waveform[0],
                Oscillator1WaveformDegrees: settings.oscillator1Waveform[1],
                Oscillator2WaveformValue: settings.oscillator2Waveform[0],
                Oscillator2WaveformDegrees: settings.oscillator2Waveform[1],
                Oscillator3WaveformValue: settings.oscillator3Waveform[0],
                Oscillator3WaveformDegrees: settings.oscillator3Waveform[1],
                Oscillator1VolumeValue: settings.oscillator1Volume[0],
                Oscillator1VolumeDegrees: settings.oscillator1Volume[1],
                Oscillator2VolumeValue: settings.oscillator2Volume[0],
                Oscillator2VolumeDegrees: settings.oscillator2Volume[1],
                Oscillator3VolumeValue: settings.oscillator3Volume[0],
                Oscillator3VolumeDegrees: settings.oscillator3Volume[1],

                Oscillator1: settings.oscillator1,
                Oscillator2: settings.oscillator2,
                Oscillator3: settings.oscillator3,
                ExternalInput: settings.externalInput,
                Noise: settings.noise,
                ExternalInputVolumeValue: settings.externalInputVolume[0],
                ExternalInputVolumeDegrees: settings.externalInputVolume[1],
                NoiseVolumeValue: settings.noiseVolume[0],
                NoiseVolumeDegrees: settings.noiseVolume[1],
                NoiseColor: settings.noiseColor,
                FilterModulation: settings.filterModulation,
                KeyboardControl1: settings.keyboardControl1,
                KeyboardControl2: settings.keyboardControl2,

                FilterCutoffValue: settings.filterCutoff[0],
                FilterCutoffDegrees: settings.filterCutoff[1],
                FilterEmphasisValue: settings.filterEmphasis[0],
                FilterEmphasisDegrees: settings.filterEmphasis[1],
                FilterContourValue: settings.filterContour[0],
                FilterContourDegrees: settings.filterContour[1],
                FilterAttackValue: settings.filterAttack[0],
                FilterAttackDegrees: settings.filterAttack[1],
                FilterDecayValue: settings.filterDecay[0],
                FilterDecayDegrees: settings.filterDecay[1],
                FilterSustainValue: settings.filterSustain[0],
                FilterSustainDegrees: settings.filterSustain[1],
                LoudnessAttackValue: settings.loudnessAttack[0],
                LoudnessAttackDegrees: settings.loudnessAttack[1],
                LoudnessDecayValue: settings.loudnessDecay[0],
                LoudnessDecayDegrees: settings.loudnessDecay[1],
                LoudnessSustainValue: settings.loudnessSustain[0],
                LoudnessSustainDegrees: settings.loudnessSustain[1],
                MainOutputVolumeValue: settings.mainOutputVolume[0],
                MainOutputVolumeDegrees: settings.mainOutputVolume[1],

                MainOutput: settings.mainOutput,
                Tuner: settings.tuner,
                PhonesOutputVolumeValue: settings.phonesOutputVolume[0],
                PhonesOutputVolumeDegrees: settings.phonesOutputVolume[1],
                Power: settings.power,
                LfoRateValue: settings.lfoRate[0],
                LfoRateDegrees: settings.lfoRate[1],
                Glide: settings.glide,
                Decay: settings.decay,
                PitchWheel: settings.pitchWheel,
                ModWheel: settings.modWheel,
                PresetName: settings.presetName,
                PresetNotes: settings.presetNotes,
                // DateCreated: Date.now(),
            })
        }).then(result => result.json())
    },
}