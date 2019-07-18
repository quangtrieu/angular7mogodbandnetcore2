using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace VNC.Framework.Commons
{
    public static class ObjectExtensions
    {
        public static ObjectId GetInternalId(string id)
        {
            ObjectId internalId;
            if (!ObjectId.TryParse(id, out internalId))
                internalId = ObjectId.Empty;

            return internalId;
        }
    }
}
