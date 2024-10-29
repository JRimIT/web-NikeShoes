using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetInfo.Helper
{
    public static class SessionHelper
    {
        public static  void SetObjectasJson(this ISession session,string Key,object value)
        {
            session.SetString(Key, JsonConvert.SerializeObject(value));
        }
        public static T GetObjectFromJson<T>(this ISession session,string key)
        {
            var value = session.GetString(key);
            return value == null ? default : JsonConvert.DeserializeObject<T>(value);
        }
    }
}
