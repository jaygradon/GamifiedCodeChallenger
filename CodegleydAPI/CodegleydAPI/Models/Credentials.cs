using System.ComponentModel.DataAnnotations;

namespace CodegleydAPI.Models
{
  /**
   * Stores user credentials.
   */
  public class Credentials
  {
    [Required]
    [EmailAddress]
    [Display(Name = "Email")]
    public string Email { get; set; }

    // Password datatype constrains 6 character minimum, with a number, uppercase, lowercase, and non-alphanumeric.
    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }
  }
}