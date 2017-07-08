using System.ComponentModel.DataAnnotations;

namespace CodegleydAPI.Models
{
  /// <summary>
  /// Stores use Credentials
  /// </summary>
  public class Credentials
  {
    [Required]
    [EmailAddress]
    [Display(Name = "Email")]
    public string Email { get; set; }

    /// <summary>
    /// Password datatype constrains 6 character minimum, with a number, uppercase, lowercase, and non-alphanumeric.
    /// </summary>
    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }
  }
}