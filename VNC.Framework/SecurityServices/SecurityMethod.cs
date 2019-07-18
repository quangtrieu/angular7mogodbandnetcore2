using System;
using System.Security.Cryptography;
using System.Text;

namespace VNC.Framework.SecurityServices
{
    public static class SecurityMethod
    {
        public static string RandomString(int length)
        {
            const string str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            int strlen = str.Length;
            var rnd = new Random();
            string retVal = String.Empty;

            for (int i = 0; i < length; i++)
                retVal += str[rnd.Next(strlen)];

            return retVal;
        }

        public static string MD5Encrypt(string plainText)
        {
            var encoder = new UTF8Encoding();
            var hasher = new MD5CryptoServiceProvider();

            byte[] data = encoder.GetBytes(plainText);
            byte[] output = hasher.ComputeHash(data);

            return BitConverter.ToString(output).Replace("-", "").ToLower();
        }

        public static string RandomPassword()
        {
            string retVal = String.Empty;
            var rd = new Random(DateTime.Now.Millisecond);
            for (int i = 1; i < 10; i++)
            {
                retVal += rd.Next(0, 9);
            }
            return retVal;
        }

        public static string Base64Encode(string input)
        {
            byte[] toEncodeAsBytes = Encoding.ASCII.GetBytes(input);

            return Convert.ToBase64String(toEncodeAsBytes);
        }

        public static string Base64Decode(string input)
        {
            byte[] encodedDataAsBytes = Convert.FromBase64String(input);
            return Encoding.ASCII.GetString(encodedDataAsBytes);
        }

        public static string StripPunctuation(string html, bool retainSpace)
        {

            //Create Regular Expression objects
            const string punctuationMatch = "[~!#\\$%\\^&*\\(\\)-+=\\{\\[\\}\\]\\|;:\\x22'<,>\\.\\?\\\\\\t\\r\\v\\f\\n]";
            var afterRegEx = new System.Text.RegularExpressions.Regex(punctuationMatch + "\\s");
            var beforeRegEx = new System.Text.RegularExpressions.Regex("\\s" + punctuationMatch);

            //Define return string
            string retHTML = html;
            //Make sure any punctuation at the end of the String is removed

            //Set up Replacement String
            string repString = null;
            repString = retainSpace ? " " : "";

            while (beforeRegEx.IsMatch(retHTML))
            {
                //Strip punctuation from beginning of word
                retHTML = beforeRegEx.Replace(retHTML, repString);
            }

            while (afterRegEx.IsMatch(retHTML))
            {
                //Strip punctuation from end of word
                retHTML = afterRegEx.Replace(retHTML, repString);
            }

            // Return modified string
            return retHTML;
        }
    }
}
