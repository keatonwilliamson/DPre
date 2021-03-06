
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Capstone.Models;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;
using Capstone.Routes.V1;
using Capstone.Helpers;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Capstone.Controllers.V1

{
    [ApiController]
    [Authorize]
    public class PresetsController : ControllerBase
    {
        public PresetsController()
        {
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection("Server=tcp:kwnss.database.windows.net,1433;Initial Catalog=Capstone;Persist Security Info=False;User ID=gkwilliamson;Password=Yerbamate19$;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        [HttpGet(Api.Presets.GetAll)]
        public async Task<IActionResult> Get()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        Id,
                        UserId,
                        UserName,
                        MasterTuneValue,
                        MasterTuneDegrees,
                        GlideAmountValue,
                        GlideAmountDegrees,
                        ModulationMixValue,
                        ModulationMixDegrees,
                        ModulationSourceA,
                        ModulationSourceB,
                        OscillatorModulation,
                        Oscillator3Control,
                        Oscillator1RangeValue,
                        Oscillator1RangeDegrees,
                        Oscillator2RangeValue,
                        Oscillator2RangeDegrees,
                        Oscillator3RangeValue,
                        Oscillator3RangeDegrees,
                        Oscillator2FrequencyValue,
                        Oscillator2FrequencyDegrees,
                        Oscillator3FrequencyValue,
                        Oscillator3FrequencyDegrees,
                        Oscillator1WaveformValue,
                        Oscillator1WaveformDegrees,
                        Oscillator2WaveformValue,
                        Oscillator2WaveformDegrees,
                        Oscillator3WaveformValue,
                        Oscillator3WaveformDegrees,
                        Oscillator1VolumeValue,
                        Oscillator1VolumeDegrees,
                        Oscillator2VolumeValue,
                        Oscillator2VolumeDegrees,
                        Oscillator3VolumeValue,
                        Oscillator3VolumeDegrees,
                        Oscillator1,
                        Oscillator2,
                        Oscillator3,
                        ExternalInput,
                        Noise,
                        ExternalInputVolumeValue,
                        ExternalInputVolumeDegrees,
                        NoiseVolumeValue,
                        NoiseVolumeDegrees,
                        NoiseColor,
                        FilterModulation,
                        KeyboardControl1,
                        KeyboardControl2,
                        FilterCutoffValue,
                        FilterCutoffDegrees,
                        FilterEmphasisValue,
                        FilterEmphasisDegrees,
                        FilterContourValue,
                        FilterContourDegrees,
                        FilterAttackValue,
                        FilterAttackDegrees,
                        FilterDecayValue,
                        FilterDecayDegrees,
                        FilterSustainValue,
                        FilterSustainDegrees,
                        LoudnessAttackValue,
                        LoudnessAttackDegrees,
                        LoudnessDecayValue,
                        LoudnessDecayDegrees,
                        LoudnessSustainValue,
                        LoudnessSustainDegrees,
                        MainOutputVolumeValue,
                        MainOutputVolumeDegrees,
                        MainOutput,
                        Tuner,
                        PhonesOutputVolumeValue,
                        PhonesOutputVolumeDegrees,
                        Power,
                        LfoRateValue,
                        LfoRateDegrees,
                        Glide,
                        Decay,
                        PitchWheel,
                        ModWheel,
                        PresetName,
                        PresetNotes,
                        DateCreated
                        FROM 
                        Preset
                        ";
                    SqlDataReader reader = await cmd.ExecuteReaderAsync();
                    List<Preset> presetList = new List<Preset>();
                    while (reader.Read())
                    {
                        Preset preset = new Preset
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            MasterTuneValue = reader.GetDouble(reader.GetOrdinal("MasterTuneValue")),
                            MasterTuneDegrees = reader.GetInt32(reader.GetOrdinal("MasterTuneDegrees")),
                            GlideAmountValue = reader.GetInt32(reader.GetOrdinal("GlideAmountValue")),
                            GlideAmountDegrees = reader.GetInt32(reader.GetOrdinal("GlideAmountDegrees")),
                            ModulationMixValue = reader.GetInt32(reader.GetOrdinal("ModulationMixValue")),
                            ModulationMixDegrees = reader.GetInt32(reader.GetOrdinal("ModulationMixDegrees")),

                            ModulationSourceA = reader.GetBoolean(reader.GetOrdinal("ModulationSourceA")),
                            ModulationSourceB = reader.GetBoolean(reader.GetOrdinal("ModulationSourceB")),
                            OscillatorModulation = reader.GetBoolean(reader.GetOrdinal("OscillatorModulation")),
                            Oscillator3Control = reader.GetBoolean(reader.GetOrdinal("Oscillator3Control")),

                            Oscillator1RangeValue = reader.GetString(reader.GetOrdinal("Oscillator1RangeValue")),
                            Oscillator1RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1RangeDegrees")),
                            Oscillator2RangeValue = reader.GetString(reader.GetOrdinal("Oscillator2RangeValue")),
                            Oscillator2RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2RangeDegrees")),
                            Oscillator3RangeValue = reader.GetString(reader.GetOrdinal("Oscillator3RangeValue")),
                            Oscillator3RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3RangeDegrees")),

                            Oscillator2FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyValue")),
                            Oscillator2FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyDegrees")),
                            Oscillator3FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyValue")),
                            Oscillator3FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyDegrees")),

                            Oscillator1WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator1WaveformValue")),
                            Oscillator1WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1WaveformDegrees")),
                            Oscillator2WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator2WaveformValue")),
                            Oscillator2WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2WaveformDegrees")),
                            Oscillator3WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator3WaveformValue")),
                            Oscillator3WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3WaveformDegrees")),

                            Oscillator1VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeValue")),
                            Oscillator1VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeDegrees")),
                            Oscillator2VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeValue")),
                            Oscillator2VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeDegrees")),
                            Oscillator3VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeValue")),
                            Oscillator3VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeDegrees")),

                            Oscillator1 = reader.GetBoolean(reader.GetOrdinal("Oscillator1")),
                            Oscillator2 = reader.GetBoolean(reader.GetOrdinal("Oscillator2")),
                            Oscillator3 = reader.GetBoolean(reader.GetOrdinal("Oscillator3")),
                            ExternalInput = reader.GetBoolean(reader.GetOrdinal("ExternalInput")),
                            Noise = reader.GetBoolean(reader.GetOrdinal("Noise")),

                            ExternalInputVolumeValue = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeValue")),
                            ExternalInputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeDegrees")),
                            NoiseVolumeValue = reader.GetInt32(reader.GetOrdinal("NoiseVolumeValue")),
                            NoiseVolumeDegrees = reader.GetInt32(reader.GetOrdinal("NoiseVolumeDegrees")),

                            NoiseColor = reader.GetBoolean(reader.GetOrdinal("NoiseColor")),
                            FilterModulation = reader.GetBoolean(reader.GetOrdinal("FilterModulation")),
                            KeyboardControl1 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl1")),
                            KeyboardControl2 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl2")),

                            FilterCutoffValue = reader.GetDouble(reader.GetOrdinal("FilterCutoffValue")),
                            FilterCutoffDegrees = reader.GetInt32(reader.GetOrdinal("FilterCutoffDegrees")),
                            FilterEmphasisValue = reader.GetInt32(reader.GetOrdinal("FilterEmphasisValue")),
                            FilterEmphasisDegrees = reader.GetInt32(reader.GetOrdinal("FilterEmphasisDegrees")),
                            FilterContourValue = reader.GetInt32(reader.GetOrdinal("FilterContourValue")),
                            FilterContourDegrees = reader.GetInt32(reader.GetOrdinal("FilterContourDegrees")),

                            FilterAttackValue = reader.GetInt32(reader.GetOrdinal("FilterAttackValue")),
                            FilterAttackDegrees = reader.GetInt32(reader.GetOrdinal("FilterAttackDegrees")),
                            FilterDecayValue = reader.GetInt32(reader.GetOrdinal("FilterDecayValue")),
                            FilterDecayDegrees = reader.GetInt32(reader.GetOrdinal("FilterDecayDegrees")),
                            FilterSustainValue = reader.GetInt32(reader.GetOrdinal("FilterSustainValue")),
                            FilterSustainDegrees = reader.GetInt32(reader.GetOrdinal("FilterSustainDegrees")),

                            LoudnessAttackValue = reader.GetInt32(reader.GetOrdinal("LoudnessAttackValue")),
                            LoudnessAttackDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessAttackDegrees")),
                            LoudnessDecayValue = reader.GetInt32(reader.GetOrdinal("LoudnessDecayValue")),
                            LoudnessDecayDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessDecayDegrees")),
                            LoudnessSustainValue = reader.GetInt32(reader.GetOrdinal("LoudnessSustainValue")),
                            LoudnessSustainDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessSustainDegrees")),

                            MainOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeValue")),
                            MainOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeDegrees")),

                            MainOutput = reader.GetBoolean(reader.GetOrdinal("MainOutput")),

                            Tuner = reader.GetBoolean(reader.GetOrdinal("Tuner")),

                            PhonesOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeValue")),
                            PhonesOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeDegrees")),

                            Power = reader.GetBoolean(reader.GetOrdinal("Power")),

                            LfoRateValue = reader.GetInt32(reader.GetOrdinal("LfoRateValue")),
                            LfoRateDegrees = reader.GetInt32(reader.GetOrdinal("LfoRateDegrees")),

                            Glide = reader.GetBoolean(reader.GetOrdinal("Glide")),
                            Decay = reader.GetBoolean(reader.GetOrdinal("Decay")),

                            PitchWheel = reader.GetInt32(reader.GetOrdinal("PitchWheel")),
                            ModWheel = reader.GetInt32(reader.GetOrdinal("ModWheel")),

                            PresetName = reader.GetString(reader.GetOrdinal("PresetName")),
                            PresetNotes = reader.GetString(reader.GetOrdinal("PresetNotes")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                        };
                        presetList.Add(preset);
                    }
                    reader.Close();
                    Response.Headers.Add("X-Requested-With", "*");
                    Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with");
                    Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
                    return Ok(presetList);
                }
            }
        }



        [HttpGet(Api.Presets.Get)]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                        Id,
                        UserId,
                        UserName,
                        MasterTuneValue,
                        MasterTuneDegrees,
                        GlideAmountValue,
                        GlideAmountDegrees,
                        ModulationMixValue,
                        ModulationMixDegrees,
                        ModulationSourceA,
                        ModulationSourceB,
                        OscillatorModulation,
                        Oscillator3Control,
                        Oscillator1RangeValue,
                        Oscillator1RangeDegrees,
                        Oscillator2RangeValue,
                        Oscillator2RangeDegrees,
                        Oscillator3RangeValue,
                        Oscillator3RangeDegrees,
                        Oscillator2FrequencyValue,
                        Oscillator2FrequencyDegrees,
                        Oscillator3FrequencyValue,
                        Oscillator3FrequencyDegrees,
                        Oscillator1WaveformValue,
                        Oscillator1WaveformDegrees,
                        Oscillator2WaveformValue,
                        Oscillator2WaveformDegrees,
                        Oscillator3WaveformValue,
                        Oscillator3WaveformDegrees,
                        Oscillator1VolumeValue,
                        Oscillator1VolumeDegrees,
                        Oscillator2VolumeValue,
                        Oscillator2VolumeDegrees,
                        Oscillator3VolumeValue,
                        Oscillator3VolumeDegrees,
                        Oscillator1,
                        Oscillator2,
                        Oscillator3,
                        ExternalInput,
                        Noise,
                        ExternalInputVolumeValue,
                        ExternalInputVolumeDegrees,
                        NoiseVolumeValue,
                        NoiseVolumeDegrees,
                        NoiseColor,
                        FilterModulation,
                        KeyboardControl1,
                        KeyboardControl2,
                        FilterCutoffValue,
                        FilterCutoffDegrees,
                        FilterEmphasisValue,
                        FilterEmphasisDegrees,
                        FilterContourValue,
                        FilterContourDegrees,
                        FilterAttackValue,
                        FilterAttackDegrees,
                        FilterDecayValue,
                        FilterDecayDegrees,
                        FilterSustainValue,
                        FilterSustainDegrees,
                        LoudnessAttackValue,
                        LoudnessAttackDegrees,
                        LoudnessDecayValue,
                        LoudnessDecayDegrees,
                        LoudnessSustainValue,
                        LoudnessSustainDegrees,
                        MainOutputVolumeValue,
                        MainOutputVolumeDegrees,
                        MainOutput,
                        Tuner,
                        PhonesOutputVolumeValue,
                        PhonesOutputVolumeDegrees,
                        Power,
                        LfoRateValue,
                        LfoRateDegrees,
                        Glide,
                        Decay,
                        PitchWheel,
                        ModWheel,
                        PresetName,
                        PresetNotes,
                        DateCreated
                        FROM 
                        Preset
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = await cmd.ExecuteReaderAsync();

                    Preset preset = null;

                    if (reader.Read())
                    {
                        preset = new Preset
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            MasterTuneValue = reader.GetDouble(reader.GetOrdinal("MasterTuneValue")),
                            MasterTuneDegrees = reader.GetInt32(reader.GetOrdinal("MasterTuneDegrees")),
                            GlideAmountValue = reader.GetInt32(reader.GetOrdinal("GlideAmountValue")),
                            GlideAmountDegrees = reader.GetInt32(reader.GetOrdinal("GlideAmountDegrees")),
                            ModulationMixValue = reader.GetInt32(reader.GetOrdinal("ModulationMixValue")),
                            ModulationMixDegrees = reader.GetInt32(reader.GetOrdinal("ModulationMixDegrees")),

                            ModulationSourceA = reader.GetBoolean(reader.GetOrdinal("ModulationSourceA")),
                            ModulationSourceB = reader.GetBoolean(reader.GetOrdinal("ModulationSourceB")),
                            OscillatorModulation = reader.GetBoolean(reader.GetOrdinal("OscillatorModulation")),
                            Oscillator3Control = reader.GetBoolean(reader.GetOrdinal("Oscillator3Control")),

                            Oscillator1RangeValue = reader.GetString(reader.GetOrdinal("Oscillator1RangeValue")),
                            Oscillator1RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1RangeDegrees")),
                            Oscillator2RangeValue = reader.GetString(reader.GetOrdinal("Oscillator2RangeValue")),
                            Oscillator2RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2RangeDegrees")),
                            Oscillator3RangeValue = reader.GetString(reader.GetOrdinal("Oscillator3RangeValue")),
                            Oscillator3RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3RangeDegrees")),

                            Oscillator2FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyValue")),
                            Oscillator2FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyDegrees")),
                            Oscillator3FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyValue")),
                            Oscillator3FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyDegrees")),

                            Oscillator1WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator1WaveformValue")),
                            Oscillator1WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1WaveformDegrees")),
                            Oscillator2WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator2WaveformValue")),
                            Oscillator2WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2WaveformDegrees")),
                            Oscillator3WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator3WaveformValue")),
                            Oscillator3WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3WaveformDegrees")),

                            Oscillator1VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeValue")),
                            Oscillator1VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeDegrees")),
                            Oscillator2VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeValue")),
                            Oscillator2VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeDegrees")),
                            Oscillator3VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeValue")),
                            Oscillator3VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeDegrees")),

                            Oscillator1 = reader.GetBoolean(reader.GetOrdinal("Oscillator1")),
                            Oscillator2 = reader.GetBoolean(reader.GetOrdinal("Oscillator2")),
                            Oscillator3 = reader.GetBoolean(reader.GetOrdinal("Oscillator3")),
                            ExternalInput = reader.GetBoolean(reader.GetOrdinal("ExternalInput")),
                            Noise = reader.GetBoolean(reader.GetOrdinal("Noise")),

                            ExternalInputVolumeValue = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeValue")),
                            ExternalInputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeDegrees")),
                            NoiseVolumeValue = reader.GetInt32(reader.GetOrdinal("NoiseVolumeValue")),
                            NoiseVolumeDegrees = reader.GetInt32(reader.GetOrdinal("NoiseVolumeDegrees")),

                            NoiseColor = reader.GetBoolean(reader.GetOrdinal("NoiseColor")),
                            FilterModulation = reader.GetBoolean(reader.GetOrdinal("FilterModulation")),
                            KeyboardControl1 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl1")),
                            KeyboardControl2 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl2")),

                            FilterCutoffValue = reader.GetDouble(reader.GetOrdinal("FilterCutoffValue")),
                            FilterCutoffDegrees = reader.GetInt32(reader.GetOrdinal("FilterCutoffDegrees")),
                            FilterEmphasisValue = reader.GetInt32(reader.GetOrdinal("FilterEmphasisValue")),
                            FilterEmphasisDegrees = reader.GetInt32(reader.GetOrdinal("FilterEmphasisDegrees")),
                            FilterContourValue = reader.GetInt32(reader.GetOrdinal("FilterContourValue")),
                            FilterContourDegrees = reader.GetInt32(reader.GetOrdinal("FilterContourDegrees")),

                            FilterAttackValue = reader.GetInt32(reader.GetOrdinal("FilterAttackValue")),
                            FilterAttackDegrees = reader.GetInt32(reader.GetOrdinal("FilterAttackDegrees")),
                            FilterDecayValue = reader.GetInt32(reader.GetOrdinal("FilterDecayValue")),
                            FilterDecayDegrees = reader.GetInt32(reader.GetOrdinal("FilterDecayDegrees")),
                            FilterSustainValue = reader.GetInt32(reader.GetOrdinal("FilterSustainValue")),
                            FilterSustainDegrees = reader.GetInt32(reader.GetOrdinal("FilterSustainDegrees")),

                            LoudnessAttackValue = reader.GetInt32(reader.GetOrdinal("LoudnessAttackValue")),
                            LoudnessAttackDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessAttackDegrees")),
                            LoudnessDecayValue = reader.GetInt32(reader.GetOrdinal("LoudnessDecayValue")),
                            LoudnessDecayDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessDecayDegrees")),
                            LoudnessSustainValue = reader.GetInt32(reader.GetOrdinal("LoudnessSustainValue")),
                            LoudnessSustainDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessSustainDegrees")),

                            MainOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeValue")),
                            MainOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeDegrees")),

                            MainOutput = reader.GetBoolean(reader.GetOrdinal("MainOutput")),

                            Tuner = reader.GetBoolean(reader.GetOrdinal("Tuner")),

                            PhonesOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeValue")),
                            PhonesOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeDegrees")),

                            Power = reader.GetBoolean(reader.GetOrdinal("Power")),

                            LfoRateValue = reader.GetInt32(reader.GetOrdinal("LfoRateValue")),
                            LfoRateDegrees = reader.GetInt32(reader.GetOrdinal("LfoRateDegrees")),

                            Glide = reader.GetBoolean(reader.GetOrdinal("Glide")),
                            Decay = reader.GetBoolean(reader.GetOrdinal("Decay")),

                            PitchWheel = reader.GetInt32(reader.GetOrdinal("PitchWheel")),
                            ModWheel = reader.GetInt32(reader.GetOrdinal("ModWheel")),

                            PresetName = reader.GetString(reader.GetOrdinal("PresetName")),
                            PresetNotes = reader.GetString(reader.GetOrdinal("PresetNotes")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                        };
                    }
                    reader.Close();
                    Response.Headers.Add("X-Requested-With", "*");
                    Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with");
                    Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS");

                    return Ok(preset);
                }
            }
        }

        [HttpGet(Api.Presets.GetBank)]
        public async Task<IActionResult> GetBank()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    var userId = HttpContext.GetUserId();
                    cmd.CommandText = $@"
                        SELECT 
                        p.Id,
                        p.UserId,
                        p.UserName,
                        p.MasterTuneValue,
                        p.MasterTuneDegrees,
                        p.GlideAmountValue,
                        p.GlideAmountDegrees,
                        p.ModulationMixValue,
                        p.ModulationMixDegrees,
                        p.ModulationSourceA,
                        p.ModulationSourceB,
                        p.OscillatorModulation,
                        p.Oscillator3Control,
                        p.Oscillator1RangeValue,
                        p.Oscillator1RangeDegrees,
                        p.Oscillator2RangeValue,
                        p.Oscillator2RangeDegrees,
                        p.Oscillator3RangeValue,
                        p.Oscillator3RangeDegrees,
                        p.Oscillator2FrequencyValue,
                        p.Oscillator2FrequencyDegrees,
                        p.Oscillator3FrequencyValue,
                        p.Oscillator3FrequencyDegrees,
                        p.Oscillator1WaveformValue,
                        p.Oscillator1WaveformDegrees,
                        p.Oscillator2WaveformValue,
                        p.Oscillator2WaveformDegrees,
                        p.Oscillator3WaveformValue,
                        p.Oscillator3WaveformDegrees,
                        p.Oscillator1VolumeValue,
                        p.Oscillator1VolumeDegrees,
                        p.Oscillator2VolumeValue,
                        p.Oscillator2VolumeDegrees,
                        p.Oscillator3VolumeValue,
                        p.Oscillator3VolumeDegrees,
                        p.Oscillator1,
                        p.Oscillator2,
                        p.Oscillator3,
                        p.ExternalInput,
                        p.Noise,
                        p.ExternalInputVolumeValue,
                        p.ExternalInputVolumeDegrees,
                        p.NoiseVolumeValue,
                        p.NoiseVolumeDegrees,
                        p.NoiseColor,
                        p.FilterModulation,
                        p.KeyboardControl1,
                        p.KeyboardControl2,
                        p.FilterCutoffValue,
                        p.FilterCutoffDegrees,
                        p.FilterEmphasisValue,
                        p.FilterEmphasisDegrees,
                        p.FilterContourValue,
                        p.FilterContourDegrees,
                        p.FilterAttackValue,
                        p.FilterAttackDegrees,
                        p.FilterDecayValue,
                        p.FilterDecayDegrees,
                        p.FilterSustainValue,
                        p.FilterSustainDegrees,
                        p.LoudnessAttackValue,
                        p.LoudnessAttackDegrees,
                        p.LoudnessDecayValue,
                        p.LoudnessDecayDegrees,
                        p.LoudnessSustainValue,
                        p.LoudnessSustainDegrees,
                        p.MainOutputVolumeValue,
                        p.MainOutputVolumeDegrees,
                        p.MainOutput,
                        p.Tuner,
                        p.PhonesOutputVolumeValue,
                        p.PhonesOutputVolumeDegrees,
                        p.Power,
                        p.LfoRateValue,
                        p.LfoRateDegrees,
                        p.Glide,
                        p.Decay,
                        p.PitchWheel,
                        p.ModWheel,
                        p.PresetName,
                        p.PresetNotes,
                        p.DateCreated
                        FROM 
                        Preset p
                        WHERE p.UserId = '{userId}'";

                    SqlDataReader reader = await cmd.ExecuteReaderAsync();
                    List<Preset> presetList = new List<Preset>();
                    while (reader.Read())
                    {
                        Preset preset = new Preset
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            MasterTuneValue = reader.GetDouble(reader.GetOrdinal("MasterTuneValue")),
                            MasterTuneDegrees = reader.GetInt32(reader.GetOrdinal("MasterTuneDegrees")),
                            GlideAmountValue = reader.GetInt32(reader.GetOrdinal("GlideAmountValue")),
                            GlideAmountDegrees = reader.GetInt32(reader.GetOrdinal("GlideAmountDegrees")),
                            ModulationMixValue = reader.GetInt32(reader.GetOrdinal("ModulationMixValue")),
                            ModulationMixDegrees = reader.GetInt32(reader.GetOrdinal("ModulationMixDegrees")),

                            ModulationSourceA = reader.GetBoolean(reader.GetOrdinal("ModulationSourceA")),
                            ModulationSourceB = reader.GetBoolean(reader.GetOrdinal("ModulationSourceB")),
                            OscillatorModulation = reader.GetBoolean(reader.GetOrdinal("OscillatorModulation")),
                            Oscillator3Control = reader.GetBoolean(reader.GetOrdinal("Oscillator3Control")),

                            Oscillator1RangeValue = reader.GetString(reader.GetOrdinal("Oscillator1RangeValue")),
                            Oscillator1RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1RangeDegrees")),
                            Oscillator2RangeValue = reader.GetString(reader.GetOrdinal("Oscillator2RangeValue")),
                            Oscillator2RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2RangeDegrees")),
                            Oscillator3RangeValue = reader.GetString(reader.GetOrdinal("Oscillator3RangeValue")),
                            Oscillator3RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3RangeDegrees")),

                            Oscillator2FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyValue")),
                            Oscillator2FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyDegrees")),
                            Oscillator3FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyValue")),
                            Oscillator3FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyDegrees")),

                            Oscillator1WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator1WaveformValue")),
                            Oscillator1WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1WaveformDegrees")),
                            Oscillator2WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator2WaveformValue")),
                            Oscillator2WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2WaveformDegrees")),
                            Oscillator3WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator3WaveformValue")),
                            Oscillator3WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3WaveformDegrees")),

                            Oscillator1VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeValue")),
                            Oscillator1VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeDegrees")),
                            Oscillator2VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeValue")),
                            Oscillator2VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeDegrees")),
                            Oscillator3VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeValue")),
                            Oscillator3VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeDegrees")),

                            Oscillator1 = reader.GetBoolean(reader.GetOrdinal("Oscillator1")),
                            Oscillator2 = reader.GetBoolean(reader.GetOrdinal("Oscillator2")),
                            Oscillator3 = reader.GetBoolean(reader.GetOrdinal("Oscillator3")),
                            ExternalInput = reader.GetBoolean(reader.GetOrdinal("ExternalInput")),
                            Noise = reader.GetBoolean(reader.GetOrdinal("Noise")),

                            ExternalInputVolumeValue = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeValue")),
                            ExternalInputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeDegrees")),
                            NoiseVolumeValue = reader.GetInt32(reader.GetOrdinal("NoiseVolumeValue")),
                            NoiseVolumeDegrees = reader.GetInt32(reader.GetOrdinal("NoiseVolumeDegrees")),

                            NoiseColor = reader.GetBoolean(reader.GetOrdinal("NoiseColor")),
                            FilterModulation = reader.GetBoolean(reader.GetOrdinal("FilterModulation")),
                            KeyboardControl1 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl1")),
                            KeyboardControl2 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl2")),

                            FilterCutoffValue = reader.GetDouble(reader.GetOrdinal("FilterCutoffValue")),
                            FilterCutoffDegrees = reader.GetInt32(reader.GetOrdinal("FilterCutoffDegrees")),
                            FilterEmphasisValue = reader.GetInt32(reader.GetOrdinal("FilterEmphasisValue")),
                            FilterEmphasisDegrees = reader.GetInt32(reader.GetOrdinal("FilterEmphasisDegrees")),
                            FilterContourValue = reader.GetInt32(reader.GetOrdinal("FilterContourValue")),
                            FilterContourDegrees = reader.GetInt32(reader.GetOrdinal("FilterContourDegrees")),

                            FilterAttackValue = reader.GetInt32(reader.GetOrdinal("FilterAttackValue")),
                            FilterAttackDegrees = reader.GetInt32(reader.GetOrdinal("FilterAttackDegrees")),
                            FilterDecayValue = reader.GetInt32(reader.GetOrdinal("FilterDecayValue")),
                            FilterDecayDegrees = reader.GetInt32(reader.GetOrdinal("FilterDecayDegrees")),
                            FilterSustainValue = reader.GetInt32(reader.GetOrdinal("FilterSustainValue")),
                            FilterSustainDegrees = reader.GetInt32(reader.GetOrdinal("FilterSustainDegrees")),

                            LoudnessAttackValue = reader.GetInt32(reader.GetOrdinal("LoudnessAttackValue")),
                            LoudnessAttackDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessAttackDegrees")),
                            LoudnessDecayValue = reader.GetInt32(reader.GetOrdinal("LoudnessDecayValue")),
                            LoudnessDecayDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessDecayDegrees")),
                            LoudnessSustainValue = reader.GetInt32(reader.GetOrdinal("LoudnessSustainValue")),
                            LoudnessSustainDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessSustainDegrees")),

                            MainOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeValue")),
                            MainOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeDegrees")),

                            MainOutput = reader.GetBoolean(reader.GetOrdinal("MainOutput")),

                            Tuner = reader.GetBoolean(reader.GetOrdinal("Tuner")),

                            PhonesOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeValue")),
                            PhonesOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeDegrees")),

                            Power = reader.GetBoolean(reader.GetOrdinal("Power")),

                            LfoRateValue = reader.GetInt32(reader.GetOrdinal("LfoRateValue")),
                            LfoRateDegrees = reader.GetInt32(reader.GetOrdinal("LfoRateDegrees")),

                            Glide = reader.GetBoolean(reader.GetOrdinal("Glide")),
                            Decay = reader.GetBoolean(reader.GetOrdinal("Decay")),

                            PitchWheel = reader.GetInt32(reader.GetOrdinal("PitchWheel")),
                            ModWheel = reader.GetInt32(reader.GetOrdinal("ModWheel")),

                            PresetName = reader.GetString(reader.GetOrdinal("PresetName")),
                            PresetNotes = reader.GetString(reader.GetOrdinal("PresetNotes")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                        };
                        presetList.Add(preset);
                    }
                    reader.Close();
                    Response.Headers.Add("X-Requested-With", "*");
                    Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with");
                    Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
                    return Ok(presetList);
                }
            }
        }


        [HttpGet(Api.Presets.SearchAll)]
        public async Task<IActionResult> SearchAll([FromQuery]string q)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    var userId = HttpContext.GetUserId();
                    cmd.CommandText = $@"
                        SELECT 
                        p.Id,
                        p.UserId,
                        p.UserName,
                        p.MasterTuneValue,
                        p.MasterTuneDegrees,
                        p.GlideAmountValue,
                        p.GlideAmountDegrees,
                        p.ModulationMixValue,
                        p.ModulationMixDegrees,
                        p.ModulationSourceA,
                        p.ModulationSourceB,
                        p.OscillatorModulation,
                        p.Oscillator3Control,
                        p.Oscillator1RangeValue,
                        p.Oscillator1RangeDegrees,
                        p.Oscillator2RangeValue,
                        p.Oscillator2RangeDegrees,
                        p.Oscillator3RangeValue,
                        p.Oscillator3RangeDegrees,
                        p.Oscillator2FrequencyValue,
                        p.Oscillator2FrequencyDegrees,
                        p.Oscillator3FrequencyValue,
                        p.Oscillator3FrequencyDegrees,
                        p.Oscillator1WaveformValue,
                        p.Oscillator1WaveformDegrees,
                        p.Oscillator2WaveformValue,
                        p.Oscillator2WaveformDegrees,
                        p.Oscillator3WaveformValue,
                        p.Oscillator3WaveformDegrees,
                        p.Oscillator1VolumeValue,
                        p.Oscillator1VolumeDegrees,
                        p.Oscillator2VolumeValue,
                        p.Oscillator2VolumeDegrees,
                        p.Oscillator3VolumeValue,
                        p.Oscillator3VolumeDegrees,
                        p.Oscillator1,
                        p.Oscillator2,
                        p.Oscillator3,
                        p.ExternalInput,
                        p.Noise,
                        p.ExternalInputVolumeValue,
                        p.ExternalInputVolumeDegrees,
                        p.NoiseVolumeValue,
                        p.NoiseVolumeDegrees,
                        p.NoiseColor,
                        p.FilterModulation,
                        p.KeyboardControl1,
                        p.KeyboardControl2,
                        p.FilterCutoffValue,
                        p.FilterCutoffDegrees,
                        p.FilterEmphasisValue,
                        p.FilterEmphasisDegrees,
                        p.FilterContourValue,
                        p.FilterContourDegrees,
                        p.FilterAttackValue,
                        p.FilterAttackDegrees,
                        p.FilterDecayValue,
                        p.FilterDecayDegrees,
                        p.FilterSustainValue,
                        p.FilterSustainDegrees,
                        p.LoudnessAttackValue,
                        p.LoudnessAttackDegrees,
                        p.LoudnessDecayValue,
                        p.LoudnessDecayDegrees,
                        p.LoudnessSustainValue,
                        p.LoudnessSustainDegrees,
                        p.MainOutputVolumeValue,
                        p.MainOutputVolumeDegrees,
                        p.MainOutput,
                        p.Tuner,
                        p.PhonesOutputVolumeValue,
                        p.PhonesOutputVolumeDegrees,
                        p.Power,
                        p.LfoRateValue,
                        p.LfoRateDegrees,
                        p.Glide,
                        p.Decay,
                        p.PitchWheel,
                        p.ModWheel,
                        p.PresetName,
                        p.PresetNotes,
                        p.DateCreated,
                        a.UserName
                        FROM 
                        Preset p
                        LEFT JOIN AspNetUsers a
                        ON a.Id = p.UserId
                        WHERE p.PresetName
                        LIKE @q";


                    cmd.Parameters.Add(new SqlParameter("@q", "%" + q + "%"));

                    SqlDataReader reader = await cmd.ExecuteReaderAsync();
                    List<Preset> presetList = new List<Preset>();
                    while (reader.Read())
                    {
                        Preset preset = new Preset
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            MasterTuneValue = reader.GetDouble(reader.GetOrdinal("MasterTuneValue")),
                            MasterTuneDegrees = reader.GetInt32(reader.GetOrdinal("MasterTuneDegrees")),
                            GlideAmountValue = reader.GetInt32(reader.GetOrdinal("GlideAmountValue")),
                            GlideAmountDegrees = reader.GetInt32(reader.GetOrdinal("GlideAmountDegrees")),
                            ModulationMixValue = reader.GetInt32(reader.GetOrdinal("ModulationMixValue")),
                            ModulationMixDegrees = reader.GetInt32(reader.GetOrdinal("ModulationMixDegrees")),

                            ModulationSourceA = reader.GetBoolean(reader.GetOrdinal("ModulationSourceA")),
                            ModulationSourceB = reader.GetBoolean(reader.GetOrdinal("ModulationSourceB")),
                            OscillatorModulation = reader.GetBoolean(reader.GetOrdinal("OscillatorModulation")),
                            Oscillator3Control = reader.GetBoolean(reader.GetOrdinal("Oscillator3Control")),

                            Oscillator1RangeValue = reader.GetString(reader.GetOrdinal("Oscillator1RangeValue")),
                            Oscillator1RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1RangeDegrees")),
                            Oscillator2RangeValue = reader.GetString(reader.GetOrdinal("Oscillator2RangeValue")),
                            Oscillator2RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2RangeDegrees")),
                            Oscillator3RangeValue = reader.GetString(reader.GetOrdinal("Oscillator3RangeValue")),
                            Oscillator3RangeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3RangeDegrees")),

                            Oscillator2FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyValue")),
                            Oscillator2FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2FrequencyDegrees")),
                            Oscillator3FrequencyValue = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyValue")),
                            Oscillator3FrequencyDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3FrequencyDegrees")),

                            Oscillator1WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator1WaveformValue")),
                            Oscillator1WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1WaveformDegrees")),
                            Oscillator2WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator2WaveformValue")),
                            Oscillator2WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2WaveformDegrees")),
                            Oscillator3WaveformValue = reader.GetString(reader.GetOrdinal("Oscillator3WaveformValue")),
                            Oscillator3WaveformDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3WaveformDegrees")),

                            Oscillator1VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeValue")),
                            Oscillator1VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator1VolumeDegrees")),
                            Oscillator2VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeValue")),
                            Oscillator2VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator2VolumeDegrees")),
                            Oscillator3VolumeValue = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeValue")),
                            Oscillator3VolumeDegrees = reader.GetInt32(reader.GetOrdinal("Oscillator3VolumeDegrees")),

                            Oscillator1 = reader.GetBoolean(reader.GetOrdinal("Oscillator1")),
                            Oscillator2 = reader.GetBoolean(reader.GetOrdinal("Oscillator2")),
                            Oscillator3 = reader.GetBoolean(reader.GetOrdinal("Oscillator3")),
                            ExternalInput = reader.GetBoolean(reader.GetOrdinal("ExternalInput")),
                            Noise = reader.GetBoolean(reader.GetOrdinal("Noise")),

                            ExternalInputVolumeValue = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeValue")),
                            ExternalInputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("ExternalInputVolumeDegrees")),
                            NoiseVolumeValue = reader.GetInt32(reader.GetOrdinal("NoiseVolumeValue")),
                            NoiseVolumeDegrees = reader.GetInt32(reader.GetOrdinal("NoiseVolumeDegrees")),

                            NoiseColor = reader.GetBoolean(reader.GetOrdinal("NoiseColor")),
                            FilterModulation = reader.GetBoolean(reader.GetOrdinal("FilterModulation")),
                            KeyboardControl1 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl1")),
                            KeyboardControl2 = reader.GetBoolean(reader.GetOrdinal("KeyboardControl2")),

                            FilterCutoffValue = reader.GetDouble(reader.GetOrdinal("FilterCutoffValue")),
                            FilterCutoffDegrees = reader.GetInt32(reader.GetOrdinal("FilterCutoffDegrees")),
                            FilterEmphasisValue = reader.GetInt32(reader.GetOrdinal("FilterEmphasisValue")),
                            FilterEmphasisDegrees = reader.GetInt32(reader.GetOrdinal("FilterEmphasisDegrees")),
                            FilterContourValue = reader.GetInt32(reader.GetOrdinal("FilterContourValue")),
                            FilterContourDegrees = reader.GetInt32(reader.GetOrdinal("FilterContourDegrees")),

                            FilterAttackValue = reader.GetInt32(reader.GetOrdinal("FilterAttackValue")),
                            FilterAttackDegrees = reader.GetInt32(reader.GetOrdinal("FilterAttackDegrees")),
                            FilterDecayValue = reader.GetInt32(reader.GetOrdinal("FilterDecayValue")),
                            FilterDecayDegrees = reader.GetInt32(reader.GetOrdinal("FilterDecayDegrees")),
                            FilterSustainValue = reader.GetInt32(reader.GetOrdinal("FilterSustainValue")),
                            FilterSustainDegrees = reader.GetInt32(reader.GetOrdinal("FilterSustainDegrees")),

                            LoudnessAttackValue = reader.GetInt32(reader.GetOrdinal("LoudnessAttackValue")),
                            LoudnessAttackDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessAttackDegrees")),
                            LoudnessDecayValue = reader.GetInt32(reader.GetOrdinal("LoudnessDecayValue")),
                            LoudnessDecayDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessDecayDegrees")),
                            LoudnessSustainValue = reader.GetInt32(reader.GetOrdinal("LoudnessSustainValue")),
                            LoudnessSustainDegrees = reader.GetInt32(reader.GetOrdinal("LoudnessSustainDegrees")),

                            MainOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeValue")),
                            MainOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("MainOutputVolumeDegrees")),

                            MainOutput = reader.GetBoolean(reader.GetOrdinal("MainOutput")),

                            Tuner = reader.GetBoolean(reader.GetOrdinal("Tuner")),

                            PhonesOutputVolumeValue = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeValue")),
                            PhonesOutputVolumeDegrees = reader.GetInt32(reader.GetOrdinal("PhonesOutputVolumeDegrees")),

                            Power = reader.GetBoolean(reader.GetOrdinal("Power")),

                            LfoRateValue = reader.GetInt32(reader.GetOrdinal("LfoRateValue")),
                            LfoRateDegrees = reader.GetInt32(reader.GetOrdinal("LfoRateDegrees")),

                            Glide = reader.GetBoolean(reader.GetOrdinal("Glide")),
                            Decay = reader.GetBoolean(reader.GetOrdinal("Decay")),

                            PitchWheel = reader.GetInt32(reader.GetOrdinal("PitchWheel")),
                            ModWheel = reader.GetInt32(reader.GetOrdinal("ModWheel")),

                            PresetName = reader.GetString(reader.GetOrdinal("PresetName")),
                            PresetNotes = reader.GetString(reader.GetOrdinal("PresetNotes")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                        };
                        presetList.Add(preset);
                    }
                    reader.Close();
                    Response.Headers.Add("X-Requested-With", "*");
                    Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with");
                    Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
                    return Ok(presetList);
                }
            }
        }



        [HttpPost(Api.Presets.Post)]
        public async Task<IActionResult> Post([FromBody] Preset preset)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    var userId = HttpContext.GetUserId();
                    cmd.CommandText = @"
                        INSERT INTO Preset (
                        UserId,
                        UserName,
                        MasterTuneValue,
                        MasterTuneDegrees,
                        GlideAmountValue,
                        GlideAmountDegrees,
                        ModulationMixValue,
                        ModulationMixDegrees,
                        ModulationSourceA,
                        ModulationSourceB,
                        OscillatorModulation,
                        Oscillator3Control,
                        Oscillator1RangeValue,
                        Oscillator1RangeDegrees,
                        Oscillator2RangeValue,
                        Oscillator2RangeDegrees,
                        Oscillator3RangeValue,
                        Oscillator3RangeDegrees,
                        Oscillator2FrequencyValue,
                        Oscillator2FrequencyDegrees,
                        Oscillator3FrequencyValue,
                        Oscillator3FrequencyDegrees,
                        Oscillator1WaveformValue,
                        Oscillator1WaveformDegrees,
                        Oscillator2WaveformValue,
                        Oscillator2WaveformDegrees,
                        Oscillator3WaveformValue,
                        Oscillator3WaveformDegrees,
                        Oscillator1VolumeValue,
                        Oscillator1VolumeDegrees,
                        Oscillator2VolumeValue,
                        Oscillator2VolumeDegrees,
                        Oscillator3VolumeValue,
                        Oscillator3VolumeDegrees,
                        Oscillator1,
                        Oscillator2,
                        Oscillator3,
                        ExternalInput,
                        Noise,
                        ExternalInputVolumeValue,
                        ExternalInputVolumeDegrees,
                        NoiseVolumeValue,
                        NoiseVolumeDegrees,
                        NoiseColor,
                        FilterModulation,
                        KeyboardControl1,
                        KeyboardControl2,
                        FilterCutoffValue,
                        FilterCutoffDegrees,
                        FilterEmphasisValue,
                        FilterEmphasisDegrees,
                        FilterContourValue,
                        FilterContourDegrees,
                        FilterAttackValue,
                        FilterAttackDegrees,
                        FilterDecayValue,
                        FilterDecayDegrees,
                        FilterSustainValue,
                        FilterSustainDegrees,
                        LoudnessAttackValue,
                        LoudnessAttackDegrees,
                        LoudnessDecayValue,
                        LoudnessDecayDegrees,
                        LoudnessSustainValue,
                        LoudnessSustainDegrees,
                        MainOutputVolumeValue,
                        MainOutputVolumeDegrees,
                        MainOutput,
                        Tuner,
                        PhonesOutputVolumeValue,
                        PhonesOutputVolumeDegrees,
                        Power,
                        LfoRateValue,
                        LfoRateDegrees,
                        Glide,
                        Decay,
                        PitchWheel,
                        ModWheel,
                        PresetName,
                        PresetNotes,
                        DateCreated
                        )
                        OUTPUT INSERTED.Id
                        VALUES (
                        @userId,
                        @userName,
                        @masterTuneValue,
                        @masterTuneDegrees,
                        @glideAmountValue,
                        @glideAmountDegrees,
                        @modulationMixValue,
                        @modulationMixDegrees,
                        @modulationSourceA,
                        @modulationSourceB,
                        @oscillatorModulation,
                        @oscillator3Control,
                        @oscillator1RangeValue,
                        @oscillator1RangeDegrees,
                        @oscillator2RangeValue,
                        @oscillator2RangeDegrees,
                        @oscillator3RangeValue,
                        @oscillator3RangeDegrees,
                        @oscillator2FrequencyValue,
                        @oscillator2FrequencyDegrees,
                        @oscillator3FrequencyValue,
                        @oscillator3FrequencyDegrees,
                        @oscillator1WaveformValue,
                        @oscillator1WaveformDegrees,
                        @oscillator2WaveformValue,
                        @oscillator2WaveformDegrees,
                        @oscillator3WaveformValue,
                        @oscillator3WaveformDegrees,
                        @oscillator1VolumeValue,
                        @oscillator1VolumeDegrees,
                        @oscillator2VolumeValue,
                        @oscillator2VolumeDegrees,
                        @oscillator3VolumeValue,
                        @oscillator3VolumeDegrees,
                        @oscillator1,
                        @oscillator2,
                        @oscillator3,
                        @externalInput,
                        @noise,
                        @externalInputVolumeValue,
                        @externalInputVolumeDegrees,
                        @noiseVolumeValue,
                        @noiseVolumeDegrees,
                        @noiseColor,
                        @filterModulation,
                        @keyboardControl1,
                        @keyboardControl2,
                        @filterCutoffValue,
                        @filterCutoffDegrees,
                        @filterEmphasisValue,
                        @filterEmphasisDegrees,
                        @filterContourValue,
                        @filterContourDegrees,
                        @filterAttackValue,
                        @filterAttackDegrees,
                        @filterDecayValue,
                        @filterDecayDegrees,
                        @filterSustainValue,
                        @filterSustainDegrees,
                        @loudnessAttackValue,
                        @loudnessAttackDegrees,
                        @loudnessDecayValue,
                        @loudnessDecayDegrees,
                        @loudnessSustainValue,
                        @loudnessSustainDegrees,
                        @mainOutputVolumeValue,
                        @mainOutputVolumeDegrees,
                        @mainOutput,
                        @tuner,
                        @phonesOutputVolumeValue,
                        @phonesOutputVolumeDegrees,
                        @power,
                        @lfoRateValue,
                        @lfoRateDegrees,
                        @glide,
                        @decay,
                        @pitchWheel,
                        @modWheel,
                        @presetName,
                        @presetNotes,
                        @dateCreated
                        )";

                    cmd.Parameters.Add(new SqlParameter("@userId", userId));
                    cmd.Parameters.Add(new SqlParameter("@userName", preset.UserName));
                    cmd.Parameters.Add(new SqlParameter("@masterTuneValue", preset.MasterTuneValue));
                    cmd.Parameters.Add(new SqlParameter("@masterTuneDegrees", preset.MasterTuneDegrees));
                    cmd.Parameters.Add(new SqlParameter("@glideAmountValue", preset.GlideAmountValue));
                    cmd.Parameters.Add(new SqlParameter("@glideAmountDegrees", preset.GlideAmountDegrees));
                    cmd.Parameters.Add(new SqlParameter("@modulationMixValue", preset.ModulationMixValue));
                    cmd.Parameters.Add(new SqlParameter("@modulationMixDegrees", preset.ModulationMixDegrees));
                    cmd.Parameters.Add(new SqlParameter("@modulationSourceA", preset.ModulationSourceA));
                    cmd.Parameters.Add(new SqlParameter("@modulationSourceB", preset.ModulationSourceB));
                    cmd.Parameters.Add(new SqlParameter("@oscillatorModulation", preset.OscillatorModulation));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3Control", preset.Oscillator3Control));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1RangeValue", preset.Oscillator1RangeValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1RangeDegrees", preset.Oscillator1RangeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2RangeValue", preset.Oscillator2RangeValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2RangeDegrees", preset.Oscillator2RangeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3RangeValue", preset.Oscillator3RangeValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3RangeDegrees", preset.Oscillator3RangeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2FrequencyValue", preset.Oscillator2FrequencyValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2FrequencyDegrees", preset.Oscillator2FrequencyDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3FrequencyValue", preset.Oscillator3FrequencyValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3FrequencyDegrees", preset.Oscillator3FrequencyDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1WaveformValue", preset.Oscillator1WaveformValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1WaveformDegrees", preset.Oscillator1WaveformDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2WaveformValue", preset.Oscillator2WaveformValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2WaveformDegrees", preset.Oscillator2WaveformDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3WaveformValue", preset.Oscillator3WaveformValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3WaveformDegrees", preset.Oscillator3WaveformDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1VolumeValue", preset.Oscillator1VolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1VolumeDegrees", preset.Oscillator1VolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2VolumeValue", preset.Oscillator2VolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2VolumeDegrees", preset.Oscillator2VolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3VolumeValue", preset.Oscillator3VolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3VolumeDegrees", preset.Oscillator3VolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@oscillator1", preset.Oscillator1));
                    cmd.Parameters.Add(new SqlParameter("@oscillator2", preset.Oscillator2));
                    cmd.Parameters.Add(new SqlParameter("@oscillator3", preset.Oscillator3));
                    cmd.Parameters.Add(new SqlParameter("@externalInput", preset.ExternalInput));
                    cmd.Parameters.Add(new SqlParameter("@noise", preset.Noise));
                    cmd.Parameters.Add(new SqlParameter("@externalInputVolumeValue", preset.ExternalInputVolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@externalInputVolumeDegrees", preset.ExternalInputVolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@noiseVolumeValue", preset.NoiseVolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@noiseVolumeDegrees", preset.NoiseVolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@noiseColor", preset.NoiseColor));
                    cmd.Parameters.Add(new SqlParameter("@filterModulation", preset.FilterModulation));
                    cmd.Parameters.Add(new SqlParameter("@keyboardControl1", preset.KeyboardControl1));
                    cmd.Parameters.Add(new SqlParameter("@keyboardControl2", preset.KeyboardControl2));
                    cmd.Parameters.Add(new SqlParameter("@filterCutoffValue", preset.FilterCutoffValue));
                    cmd.Parameters.Add(new SqlParameter("@filterCutoffDegrees", preset.FilterCutoffDegrees));
                    cmd.Parameters.Add(new SqlParameter("@filterEmphasisValue", preset.FilterEmphasisValue));
                    cmd.Parameters.Add(new SqlParameter("@filterEmphasisDegrees", preset.FilterEmphasisDegrees));
                    cmd.Parameters.Add(new SqlParameter("@filterContourValue", preset.FilterContourValue));
                    cmd.Parameters.Add(new SqlParameter("@filterContourDegrees", preset.FilterContourDegrees));
                    cmd.Parameters.Add(new SqlParameter("@filterAttackValue", preset.FilterAttackValue));
                    cmd.Parameters.Add(new SqlParameter("@filterAttackDegrees", preset.FilterAttackDegrees));
                    cmd.Parameters.Add(new SqlParameter("@filterDecayValue", preset.FilterDecayValue));
                    cmd.Parameters.Add(new SqlParameter("@filterDecayDegrees", preset.FilterDecayDegrees));
                    cmd.Parameters.Add(new SqlParameter("@filterSustainValue", preset.FilterSustainValue));
                    cmd.Parameters.Add(new SqlParameter("@filterSustainDegrees", preset.FilterSustainDegrees));
                    cmd.Parameters.Add(new SqlParameter("@loudnessAttackValue", preset.LoudnessAttackValue));
                    cmd.Parameters.Add(new SqlParameter("@loudnessAttackDegrees", preset.LoudnessAttackDegrees));
                    cmd.Parameters.Add(new SqlParameter("@loudnessDecayValue", preset.LoudnessDecayValue));
                    cmd.Parameters.Add(new SqlParameter("@loudnessDecayDegrees", preset.LoudnessDecayDegrees));
                    cmd.Parameters.Add(new SqlParameter("@loudnessSustainValue", preset.LoudnessSustainValue));
                    cmd.Parameters.Add(new SqlParameter("@loudnessSustainDegrees", preset.LoudnessSustainDegrees));
                    cmd.Parameters.Add(new SqlParameter("@mainOutputVolumeValue", preset.MainOutputVolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@mainOutputVolumeDegrees", preset.MainOutputVolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@mainOutput", preset.MainOutput));
                    cmd.Parameters.Add(new SqlParameter("@tuner", preset.Tuner));
                    cmd.Parameters.Add(new SqlParameter("@phonesOutputVolumeValue", preset.PhonesOutputVolumeValue));
                    cmd.Parameters.Add(new SqlParameter("@phonesOutputVolumeDegrees", preset.PhonesOutputVolumeDegrees));
                    cmd.Parameters.Add(new SqlParameter("@power", preset.Power));
                    cmd.Parameters.Add(new SqlParameter("@lfoRateValue", preset.LfoRateValue));
                    cmd.Parameters.Add(new SqlParameter("@lfoRateDegrees", preset.LfoRateDegrees));
                    cmd.Parameters.Add(new SqlParameter("@glide", preset.Glide));
                    cmd.Parameters.Add(new SqlParameter("@decay", preset.Decay));
                    cmd.Parameters.Add(new SqlParameter("@pitchWheel", preset.PitchWheel));
                    cmd.Parameters.Add(new SqlParameter("@modWheel", preset.ModWheel));
                    cmd.Parameters.Add(new SqlParameter("@presetName", preset.PresetName));
                    cmd.Parameters.Add(new SqlParameter("@presetNotes", preset.PresetNotes));
                    cmd.Parameters.Add(new SqlParameter("@dateCreated", DateTime.Now));

                    // int newId = (int)await cmd.ExecuteScalarAsync();
                    // preset.Id = newId;

                    Response.Headers.Add("X-Requested-With", "*");
                    Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with");
                    Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
                    var message = "yeahh! no exceptions were thrown";
                    try
                    {
                        int newId = (int)await cmd.ExecuteScalarAsync();
                        preset.Id = newId;
                    }
                    catch (Exception ex)
                    {
                        message = ex.Message;
                    }

                    return Ok(new { id = preset.Id, message = message });
                }
            }
        }


        [HttpPut(Api.Presets.Edit)]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Preset preset)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        var userId = HttpContext.GetUserId();
                        cmd.CommandText = @"UPDATE Preset
                                        SET UserId = @userId,
                                            UserName = @userName,
                                            MasterTuneValue = @masterTuneValue,
                                            MasterTuneDegrees = @masterTuneDegrees,
                                            GlideAmountValue = @glideAmountValue,
                                            GlideAmountDegrees = @glideAmountDegrees,
                                            ModulationMixValue = @modulationMixValue,
                                            ModulationMixDegrees = @modulationMixDegrees,
                                            ModulationSourceA = @modulationSourceA,
                                            ModulationSourceB = @modulationSourceB,
                                            OscillatorModulation = @oscillatorModulation,
                                            Oscillator3Control = @oscillator3Control,
                                            Oscillator1RangeValue = @oscillator1RangeValue,
                                            Oscillator1RangeDegrees = @oscillator1RangeDegrees,
                                            Oscillator2RangeValue = @oscillator2RangeValue,
                                            Oscillator2RangeDegrees = @oscillator2RangeDegrees,
                                            Oscillator3RangeValue = @oscillator3RangeValue,
                                            Oscillator3RangeDegrees = @oscillator3RangeDegrees,
                                            Oscillator2FrequencyValue = @oscillator2FrequencyValue,
                                            Oscillator2FrequencyDegrees = @oscillator2FrequencyDegrees,
                                            Oscillator3FrequencyValue = @oscillator3FrequencyValue,
                                            Oscillator3FrequencyDegrees = @oscillator3FrequencyDegrees,
                                            Oscillator1WaveformValue = @oscillator1WaveformValue,
                                            Oscillator1WaveformDegrees = @oscillator1WaveformDegrees,
                                            Oscillator2WaveformValue = @oscillator2WaveformValue,
                                            Oscillator2WaveformDegrees = @oscillator2WaveformDegrees,
                                            Oscillator3WaveformValue = @oscillator3WaveformValue,
                                            Oscillator3WaveformDegrees = @oscillator3WaveformDegrees,
                                            Oscillator1VolumeValue = @oscillator1VolumeValue,
                                            Oscillator1VolumeDegrees = @oscillator1VolumeDegrees,
                                            Oscillator2VolumeValue = @oscillator2VolumeValue,
                                            Oscillator2VolumeDegrees = @oscillator2VolumeDegrees,
                                            Oscillator3VolumeValue = @oscillator3VolumeValue,
                                            Oscillator3VolumeDegrees = @oscillator3VolumeDegrees,
                                            Oscillator1 = @oscillator1,
                                            Oscillator2 = @oscillator2,
                                            Oscillator3 = @oscillator3,
                                            ExternalInput = @externalInput,
                                            Noise = @noise,
                                            ExternalInputVolumeValue = @externalInputVolumeValue,
                                            ExternalInputVolumeDegrees = @externalInputVolumeDegrees,
                                            NoiseVolumeValue = @noiseVolumeValue,
                                            NoiseVolumeDegrees = @noiseVolumeDegrees,
                                            NoiseColor = @noiseColor,
                                            FilterModulation = @filterModulation,
                                            KeyboardControl1 = @keyboardControl1,
                                            KeyboardControl2 = @keyboardControl2,
                                            FilterCutoffValue = @filterCutoffValue,
                                            FilterCutoffDegrees = @filterCutoffDegrees,
                                            FilterEmphasisValue = @filterEmphasisValue,
                                            FilterEmphasisDegrees = @filterEmphasisDegrees,
                                            FilterContourValue = @filterContourValue,
                                            FilterContourDegrees = @filterContourDegrees,
                                            FilterAttackValue = @filterAttackValue,
                                            FilterAttackDegrees = @filterAttackDegrees,
                                            FilterDecayValue = @filterDecayValue,
                                            FilterDecayDegrees = @filterDecayDegrees,
                                            FilterSustainValue = @filterSustainValue,
                                            FilterSustainDegrees = @filterSustainDegrees,
                                            LoudnessAttackValue = @loudnessAttackValue,
                                            LoudnessAttackDegrees = @loudnessAttackDegrees,
                                            LoudnessDecayValue = @loudnessDecayValue,
                                            LoudnessDecayDegrees = @loudnessDecayDegrees,
                                            LoudnessSustainValue = @loudnessSustainValue,
                                            LoudnessSustainDegrees = @loudnessSustainDegrees,
                                            MainOutputVolumeValue = @mainOutputVolumeValue,
                                            MainOutputVolumeDegrees = @mainOutputVolumeDegrees,
                                            MainOutput = @mainOutput,
                                            Tuner = @tuner,
                                            PhonesOutputVolumeValue = @phonesOutputVolumeValue,
                                            PhonesOutputVolumeDegrees = @phonesOutputVolumeDegrees,
                                            Power = @power,
                                            LfoRateValue = @lfoRateValue,
                                            LfoRateDegrees = @lfoRateDegrees,
                                            Glide = @glide,
                                            Decay = @decay,
                                            PitchWheel = @pitchWheel,
                                            ModWheel = @modWheel,
                                            PresetName = @presetName,
                                            PresetNotes = @presetNotes,
                                            DateCreated = @dateCreated                
                                        WHERE Id = @id";


                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.Parameters.Add(new SqlParameter("@userId", userId));
                        cmd.Parameters.Add(new SqlParameter("@userName", preset.UserName));
                        cmd.Parameters.Add(new SqlParameter("@masterTuneValue", preset.MasterTuneValue));
                        cmd.Parameters.Add(new SqlParameter("@masterTuneDegrees", preset.MasterTuneDegrees));
                        cmd.Parameters.Add(new SqlParameter("@glideAmountValue", preset.GlideAmountValue));
                        cmd.Parameters.Add(new SqlParameter("@glideAmountDegrees", preset.GlideAmountDegrees));
                        cmd.Parameters.Add(new SqlParameter("@modulationMixValue", preset.ModulationMixValue));
                        cmd.Parameters.Add(new SqlParameter("@modulationMixDegrees", preset.ModulationMixDegrees));
                        cmd.Parameters.Add(new SqlParameter("@modulationSourceA", preset.ModulationSourceA));
                        cmd.Parameters.Add(new SqlParameter("@modulationSourceB", preset.ModulationSourceB));
                        cmd.Parameters.Add(new SqlParameter("@oscillatorModulation", preset.OscillatorModulation));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3Control", preset.Oscillator3Control));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1RangeValue", preset.Oscillator1RangeValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1RangeDegrees", preset.Oscillator1RangeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2RangeValue", preset.Oscillator2RangeValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2RangeDegrees", preset.Oscillator2RangeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3RangeValue", preset.Oscillator3RangeValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3RangeDegrees", preset.Oscillator3RangeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2FrequencyValue", preset.Oscillator2FrequencyValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2FrequencyDegrees", preset.Oscillator2FrequencyDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3FrequencyValue", preset.Oscillator3FrequencyValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3FrequencyDegrees", preset.Oscillator3FrequencyDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1WaveformValue", preset.Oscillator1WaveformValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1WaveformDegrees", preset.Oscillator1WaveformDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2WaveformValue", preset.Oscillator2WaveformValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2WaveformDegrees", preset.Oscillator2WaveformDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3WaveformValue", preset.Oscillator3WaveformValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3WaveformDegrees", preset.Oscillator3WaveformDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1VolumeValue", preset.Oscillator1VolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1VolumeDegrees", preset.Oscillator1VolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2VolumeValue", preset.Oscillator2VolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2VolumeDegrees", preset.Oscillator2VolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3VolumeValue", preset.Oscillator3VolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3VolumeDegrees", preset.Oscillator3VolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@oscillator1", preset.Oscillator1));
                        cmd.Parameters.Add(new SqlParameter("@oscillator2", preset.Oscillator2));
                        cmd.Parameters.Add(new SqlParameter("@oscillator3", preset.Oscillator3));
                        cmd.Parameters.Add(new SqlParameter("@externalInput", preset.ExternalInput));
                        cmd.Parameters.Add(new SqlParameter("@noise", preset.Noise));
                        cmd.Parameters.Add(new SqlParameter("@externalInputVolumeValue", preset.ExternalInputVolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@externalInputVolumeDegrees", preset.ExternalInputVolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@noiseVolumeValue", preset.NoiseVolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@noiseVolumeDegrees", preset.NoiseVolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@noiseColor", preset.NoiseColor));
                        cmd.Parameters.Add(new SqlParameter("@filterModulation", preset.FilterModulation));
                        cmd.Parameters.Add(new SqlParameter("@keyboardControl1", preset.KeyboardControl1));
                        cmd.Parameters.Add(new SqlParameter("@keyboardControl2", preset.KeyboardControl2));
                        cmd.Parameters.Add(new SqlParameter("@filterCutoffValue", preset.FilterCutoffValue));
                        cmd.Parameters.Add(new SqlParameter("@filterCutoffDegrees", preset.FilterCutoffDegrees));
                        cmd.Parameters.Add(new SqlParameter("@filterEmphasisValue", preset.FilterEmphasisValue));
                        cmd.Parameters.Add(new SqlParameter("@filterEmphasisDegrees", preset.FilterEmphasisDegrees));
                        cmd.Parameters.Add(new SqlParameter("@filterContourValue", preset.FilterContourValue));
                        cmd.Parameters.Add(new SqlParameter("@filterContourDegrees", preset.FilterContourDegrees));
                        cmd.Parameters.Add(new SqlParameter("@filterAttackValue", preset.FilterAttackValue));
                        cmd.Parameters.Add(new SqlParameter("@filterAttackDegrees", preset.FilterAttackDegrees));
                        cmd.Parameters.Add(new SqlParameter("@filterDecayValue", preset.FilterDecayValue));
                        cmd.Parameters.Add(new SqlParameter("@filterDecayDegrees", preset.FilterDecayDegrees));
                        cmd.Parameters.Add(new SqlParameter("@filterSustainValue", preset.FilterSustainValue));
                        cmd.Parameters.Add(new SqlParameter("@filterSustainDegrees", preset.FilterSustainDegrees));
                        cmd.Parameters.Add(new SqlParameter("@loudnessAttackValue", preset.LoudnessAttackValue));
                        cmd.Parameters.Add(new SqlParameter("@loudnessAttackDegrees", preset.LoudnessAttackDegrees));
                        cmd.Parameters.Add(new SqlParameter("@loudnessDecayValue", preset.LoudnessDecayValue));
                        cmd.Parameters.Add(new SqlParameter("@loudnessDecayDegrees", preset.LoudnessDecayDegrees));
                        cmd.Parameters.Add(new SqlParameter("@loudnessSustainValue", preset.LoudnessSustainValue));
                        cmd.Parameters.Add(new SqlParameter("@loudnessSustainDegrees", preset.LoudnessSustainDegrees));
                        cmd.Parameters.Add(new SqlParameter("@mainOutputVolumeValue", preset.MainOutputVolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@mainOutputVolumeDegrees", preset.MainOutputVolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@mainOutput", preset.MainOutput));
                        cmd.Parameters.Add(new SqlParameter("@tuner", preset.Tuner));
                        cmd.Parameters.Add(new SqlParameter("@phonesOutputVolumeValue", preset.PhonesOutputVolumeValue));
                        cmd.Parameters.Add(new SqlParameter("@phonesOutputVolumeDegrees", preset.PhonesOutputVolumeDegrees));
                        cmd.Parameters.Add(new SqlParameter("@power", preset.Power));
                        cmd.Parameters.Add(new SqlParameter("@lfoRateValue", preset.LfoRateValue));
                        cmd.Parameters.Add(new SqlParameter("@lfoRateDegrees", preset.LfoRateDegrees));
                        cmd.Parameters.Add(new SqlParameter("@glide", preset.Glide));
                        cmd.Parameters.Add(new SqlParameter("@decay", preset.Decay));
                        cmd.Parameters.Add(new SqlParameter("@pitchWheel", preset.PitchWheel));
                        cmd.Parameters.Add(new SqlParameter("@modWheel", preset.ModWheel));
                        cmd.Parameters.Add(new SqlParameter("@presetName", preset.PresetName));
                        cmd.Parameters.Add(new SqlParameter("@presetNotes", preset.PresetNotes));
                        cmd.Parameters.Add(new SqlParameter("@dateCreated", preset.DateCreated));

                        Response.Headers.Add("X-Requested-With", "*");
                        Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with");
                        Response.Headers.Add("Access-Control-Allow-Origin", "*");
                        Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
                        
                        int rowsAffected = await cmd.ExecuteNonQueryAsync();
                        if (rowsAffected > 0)
                        {
                            return new StatusCodeResult(StatusCodes.Status204NoContent);
                        }
                        return BadRequest($"No preset with Id of {id}");
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }







        [HttpDelete(Api.Presets.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"DELETE FROM Preset WHERE Id = @id";
                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        int rowsAffected = await cmd.ExecuteNonQueryAsync();
                        if (rowsAffected > 0)
                        {
                            return new StatusCodeResult(StatusCodes.Status204NoContent);
                        }
                        throw new Exception("No rows affected");
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}