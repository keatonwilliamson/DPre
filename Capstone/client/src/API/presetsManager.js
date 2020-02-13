import { createAuthHeaders } from '../API/userManager';
import { getUser } from './userManager';


// var userId = getUser();

export default {
    getAllPresets() {
        const authHeader = createAuthHeaders();
        return fetch('/api/v1/presets', {
            headers: authHeader
        })
            .then(result => result.json())
            .then(settings => settings.map(settings => this.compressSettings(settings)));
    },
    getBank() {
        const authHeader = createAuthHeaders();
        return fetch('/api/v1/presets/bank', {
            headers: authHeader
        })
            .then(result => result.json())
            .then(settings => settings.map(settings => this.compressSettings(settings)));
    },
    searchAll(q) {
        const authHeader = createAuthHeaders();
        return fetch(`/api/v1/presets/search?q=${q}`, {
            headers: authHeader
        })
            .then(result => result.json())
            .then(settings => settings.map(settings => this.compressSettings(settings)));
    },
    getPreset(id) {
        const authHeader = createAuthHeaders();
        return fetch(`/api/v1/presets/${id}`, {
            headers: authHeader
        })
            .then(result => result.json())
            .then(settings => this.compressSettings(settings))
    },
    postPreset(settings) {
        const authHeader = createAuthHeaders();
        return fetch('/api/v1/presets', {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify(this.expandSettings(settings, false))
        }).then(result => result.json())
    },
    editPreset(settings) {
        const authHeader = createAuthHeaders();
        return fetch(`/api/v1/presets/${settings.id}`, {
            method: "PUT",
            headers: authHeader,
            body: JSON.stringify(this.expandSettings(settings, true))
        }).then(result => console.log(result))
    },
    deletePreset(id) {
        const authHeader = createAuthHeaders();
        return fetch(`/api/v1/presets/${id}`, {
            method: "DELETE",
            headers: authHeader
        }).then(response => console.log(response))
    },
    expandSettings(settings, putRequest) {
        return {
            ...(putRequest) && {Id: settings.id, UserId: settings.userId, DateCreated: settings.dateCreated },
            UserName: getUser().username,
            MasterTuneValue: settings.masterTune[0],
            MasterTuneDegrees: settings.masterTune[1],
            GlideAmountValue: settings.glideAmount[0],
            GlideAmountDegrees: settings.glideAmount[1],
            ModulationMixValue: settings.modulationMix[0],
            ModulationMixDegrees: settings.modulationMix[1],
            ModulationSourceA: settings.modulationSourceA,
            ModulationSourceB: settings.modulationSourceB,
            OscillatorModulation: settings.oscillatorModulation,
            Oscillator3Control: settings.oscillator3Control,
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
        }
    },
    compressSettings(settings) {
        return {

            id: settings.id,
            userId: settings.userId,
            userName: settings.userName,
            masterTune: [settings.masterTuneValue, settings.masterTuneDegrees],
            glideAmount: [settings.glideAmountValue, settings.glideAmountDegrees],
            modulationMix: [settings.modulationMixValue, settings.modulationMixDegrees],
            modulationSourceA: settings.modulationSourceA,
            modulationSourceB: settings.modulationSourceB,
            oscillatorModulation: settings.oscillatorModulation,
            oscillator3Control: settings.oscillator3Control,

            oscillator1Range: [settings.oscillator1RangeValue, settings.oscillator1RangeDegrees],
            oscillator2Range: [settings.oscillator2RangeValue, settings.oscillator2RangeDegrees],
            oscillator3Range: [settings.oscillator3RangeValue, settings.oscillator3RangeDegrees],
            oscillator2Frequency: [settings.oscillator2FrequencyValue, settings.oscillator2FrequencyDegrees],
            oscillator3Frequency: [settings.oscillator3FrequencyValue, settings.oscillator3FrequencyDegrees],
            oscillator1Waveform: [settings.oscillator1WaveformValue, settings.oscillator1WaveformDegrees],
            oscillator2Waveform: [settings.oscillator2WaveformValue, settings.oscillator2WaveformDegrees],
            oscillator3Waveform: [settings.oscillator3WaveformValue, settings.oscillator3WaveformDegrees],
            oscillator1Volume: [settings.oscillator1VolumeValue, settings.oscillator1VolumeDegrees],
            oscillator2Volume: [settings.oscillator2VolumeValue, settings.oscillator2VolumeDegrees],
            oscillator3Volume: [settings.oscillator3VolumeValue, settings.oscillator3VolumeDegrees],
            oscillator1: settings.oscillator1,
            oscillator2: settings.oscillator2,
            oscillator3: settings.oscillator3,
            externalInput: settings.externalInput,
            noise: settings.noise,
            externalInputVolume: [settings.externalInputVolumeValue, settings.externalInputVolumeDegrees],
            noiseVolume: [settings.noiseVolumeValue, settings.noiseVolumeDegrees],
            noiseColor: settings.noiseColor,
            filterModulation: settings.filterModulation,
            keyboardControl1: settings.keyboardControl1,
            keyboardControl2: settings.keyboardControl2,
            filterCutoff: [settings.filterCutoffValue, settings.filterCutoffDegrees],
            filterEmphasis: [settings.filterEmphasisValue, settings.filterEmphasisDegrees],
            filterContour: [settings.filterContourValue, settings.filterContourDegrees],
            filterAttack: [settings.filterAttackValue, settings.filterAttackDegrees],
            filterDecay: [settings.filterDecayValue, settings.filterDecayDegrees],
            filterSustain: [settings.filterSustainValue, settings.filterSustainDegrees],
            loudnessAttack: [settings.loudnessAttackValue, settings.loudnessAttackDegrees],
            loudnessDecay: [settings.loudnessDecayValue, settings.loudnessDecayDegrees],
            loudnessSustain: [settings.loudnessSustainValue, settings.loudnessSustainDegrees],
            mainOutputVolume: [settings.mainOutputVolumeValue, settings.mainOutputVolumeDegrees],
            mainOutput: settings.mainOutput,
            tuner: settings.tuner,
            phonesOutputVolume: [settings.phonesOutputVolumeValue, settings.phonesOutputVolumeDegrees],
            power: settings.power,
            lfoRate: [settings.lfoRateValue, settings.lfoRateDegrees],
            glide: settings.glide,
            decay: settings.decay,
            pitchWheel: settings.pitchWheel,
            modWheel: settings.modWheel,
            presetName: settings.presetName,
            presetNotes: settings.presetNotes,
            dateCreated: settings.dateCreated
        }
    }

}