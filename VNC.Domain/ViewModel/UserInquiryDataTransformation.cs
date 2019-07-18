
namespace VNC.Domain.ViewModel
{
    public class UserInquiryDataTransformation
    {
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public int CurrentPageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortDirection { get; set; }
        public string SortExpression { get; set; }
    }
}
