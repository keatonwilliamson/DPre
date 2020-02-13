using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
    public class Preset
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        // 
        public double MasterTuneValue { get; set; }
        public int MasterTuneDegrees { get; set; }
        public int GlideAmountValue { get; set; }
        public int GlideAmountDegrees { get; set; }
        public int ModulationMixValue { get; set; }
        public int ModulationMixDegrees { get; set; }
        // 
        public bool ModulationSourceA { get; set; }
        public bool ModulationSourceB { get; set; }
        public bool OscillatorModulation { get; set; }
        public bool Oscillator3Control { get; set; }
        // 
        public string Oscillator1RangeValue { get; set; }
        public int Oscillator1RangeDegrees { get; set; }
        public string Oscillator2RangeValue { get; set; }
        public int Oscillator2RangeDegrees { get; set; }
        public string Oscillator3RangeValue { get; set; }
        public int Oscillator3RangeDegrees { get; set; }
        // 
        public int Oscillator2FrequencyValue { get; set; }
        public int Oscillator2FrequencyDegrees { get; set; }
        public int Oscillator3FrequencyValue { get; set; }
        public int Oscillator3FrequencyDegrees { get; set; }
        // 
        public string Oscillator1WaveformValue { get; set; }
        public int Oscillator1WaveformDegrees { get; set; }
        public string Oscillator2WaveformValue { get; set; }
        public int Oscillator2WaveformDegrees { get; set; }
        public string Oscillator3WaveformValue { get; set; }
        public int Oscillator3WaveformDegrees { get; set; }
        // 
        public int Oscillator1VolumeValue { get; set; }
        public int Oscillator1VolumeDegrees { get; set; }
        public int Oscillator2VolumeValue { get; set; }
        public int Oscillator2VolumeDegrees { get; set; }
        public int Oscillator3VolumeValue { get; set; }
        public int Oscillator3VolumeDegrees { get; set; }
        // 
        public bool Oscillator1 { get; set; }
        public bool Oscillator2 { get; set; }
        public bool Oscillator3 { get; set; }
        public bool ExternalInput { get; set; }
        public bool Noise { get; set; }
        // 
        public int ExternalInputVolumeValue { get; set; }
        public int ExternalInputVolumeDegrees { get; set; }
        public int NoiseVolumeValue { get; set; }
        public int NoiseVolumeDegrees { get; set; }
        // 
        public bool NoiseColor { get; set; }
        public bool FilterModulation { get; set; }
        public bool KeyboardControl1 { get; set; }
        public bool KeyboardControl2 { get; set; }
        // 
        public double FilterCutoffValue { get; set; }
        public int FilterCutoffDegrees { get; set; }
        public int FilterEmphasisValue { get; set; }
        public int FilterEmphasisDegrees { get; set; }
        public int FilterContourValue { get; set; }
        public int FilterContourDegrees { get; set; }
        // 
        public int FilterAttackValue { get; set; }
        public int FilterAttackDegrees { get; set; }
        public int FilterDecayValue { get; set; }
        public int FilterDecayDegrees { get; set; }
        public int FilterSustainValue { get; set; }
        public int FilterSustainDegrees { get; set; }
        // 
        public int LoudnessAttackValue { get; set; }
        public int LoudnessAttackDegrees { get; set; }
        public int LoudnessDecayValue { get; set; }
        public int LoudnessDecayDegrees { get; set; }
        public int LoudnessSustainValue { get; set; }
        public int LoudnessSustainDegrees { get; set; }
        // 
        public int MainOutputVolumeValue { get; set; }
        public int MainOutputVolumeDegrees { get; set; }
        public bool MainOutput { get; set; }
        // 
        public bool Tuner { get; set; }
        public int PhonesOutputVolumeValue { get; set; }
        public int PhonesOutputVolumeDegrees { get; set; }
        public bool Power { get; set; }
        // 
        // 
        public int LfoRateValue { get; set; }
        public int LfoRateDegrees { get; set; }
        public bool Glide { get; set; }
        public bool Decay { get; set; }
        public int PitchWheel { get; set; }
        public int ModWheel { get; set; }
        // 
        // 
        public string PresetName { get; set; }
        public string PresetNotes { get; set; }
        public DateTime DateCreated { get; set; }
    }
}