using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Routes.V1
{
    public static class Api
    {
        internal const string Root = "api";
        internal const string Version = "v1";
        internal const string Base = Root + "/" + Version;

        public static class Values
        {
            public const string GetAll = Base + "/Values";
            public const string Get = Base + "/Values/{id}";
        }
        public static class Presets
        {
            public const string GetAll = Base + "/Presets";
            public const string GetBank = Base + "/Presets/Bank";
            public const string SearchAll = Base + "/Presets/Search";
            public const string Get = Base + "/Presets/{id}";
            public const string Post = Base + "/Presets";
            public const string Edit = Base + "/Presets/{id}";
            public const string Delete = Base + "/Presets/{id}";
        }

        public static class User
        {
            public const string Login = Base + "/Auth/Login";
            public const string Register = Base + "/Auth/Register";
            public const string Refresh = Base + "/Auth/Refresh";
        }
    }
}
