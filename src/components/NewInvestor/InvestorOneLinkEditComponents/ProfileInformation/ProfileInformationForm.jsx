import { Form, Spinner } from "react-bootstrap";
import "./ProfileInformationForm.scss";
import { Button, InputGroup } from "react-bootstrap";
import IconCloudUpload from "../../../Investor/SvgIcons/IconCloudUpload";
import { useState } from "react";
import { getBase64 } from "../../../../utils/getBase64";
import { postInvestorData, updateUserAPI } from "../../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  selectUserProfilePicture,
  selectUserSocialLinks,
  updateUserCompany,
} from "../../../../Store/features/user/userSlice";
import DividerH from "../../../Shared/DividerH/DividerH";
import toast from "react-hot-toast";

export default function ProfileInformationForm() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const userProfilePicture = useSelector(selectUserProfilePicture);
  const userSocialLinks = useSelector(selectUserSocialLinks);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleProfileInfoSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const {
      designation,
      location,
      bio,
      experience,
      website,
      linkedin,
      // facebook,
      twitter,
      instagram,
    } = e.target;

    let updatedUserData = {
      designation: designation.value,
      location: location.value,
      bio: bio.value,
      experience: experience.value,
    };

    if (selectedFile) {
      const picture = await getBase64(selectedFile);
      updatedUserData.profilePicture = picture;
    }

    let updatedSocialLinks = {
      socialLinks: {
        website: website.value,
        linkedin: linkedin.value,
        // facebook: facebook.value,
        twitter: twitter.value,
        instagram: instagram.value,
      },
      founderId: loggedInUser._id,
    };

    // console.log("user data", updatedUserData);
    // console.log("company data", updatedSocialLinks);

    try {
      const [userResponse, companyResponse] = await Promise.all([
        updateUserAPI(updatedUserData),
        postInvestorData(updatedSocialLinks),
      ]);
      // console.log("userResponse", userResponse);
      // console.log("companyResponse", companyResponse);
      dispatch(loginSuccess(userResponse.data.data));
      dispatch(
        updateUserCompany({ socialLinks: companyResponse.data.socialLinks })
      );
      toast.success("Changes Saved");
    } catch (error) {
      console.error("Error saving information", error);
      toast.error("Error saving information. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handleProfileInfoSubmit}
      className="px-3 px-lg-4 pb-4 d-flex flex-column gap-3 profile-information-form"
    >
      <Form.Group controlId="onelink-profilePicture" className="form-group">
        <p className="mb-3 fs-5">Profile Picture</p>
        <Form.Label style={{ cursor: "pointer" }} className="picture-label">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="profile"
              width={100}
              height={100}
              className="rounded-circle object-fit-cover"
            />
          ) : userProfilePicture ? (
            <img
              src={userProfilePicture}
              alt="profile"
              width={100}
              height={100}
              className="rounded-circle object-fit-cover shadow-lg"
            />
          ) : (
            <IconCloudUpload height={40} width={40} />
          )}
        </Form.Label>
        <input
          type="file"
          name="profilePicture"
          id="onelink-profilePicture"
          className="visually-hidden"
          onInput={(e) => setSelectedFile(e.target.files[0])}
        />
      </Form.Group>

      <InputGroup className="flex-column flex-md-row gap-4">
        <Form.Group controlId="onelink-designation" className="form-group">
          <Form.Label className="text-capitalize">designation</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            defaultValue={loggedInUser.designation}
          />
        </Form.Group>
        <Form.Group controlId="onelink-location" className="form-group">
          <Form.Label className="text-capitalize">location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            defaultValue={loggedInUser.location}
          />
        </Form.Group>
      </InputGroup>

      <Form.Group controlId="onelink-bio" className="form-group">
        <Form.Label className="text-capitalize">bio</Form.Label>
        <Form.Control
          as={"textarea"}
          rows={5}
          type="text"
          name="bio"
          defaultValue={loggedInUser.bio}
        />
      </Form.Group>

      <Form.Group controlId="onelink-experience" className="form-group">
        <Form.Label className="text-capitalize">Current Experience</Form.Label>
        <Form.Control
          type="text"
          name="experience"
          defaultValue={loggedInUser.experience}
        />
      </Form.Group>

      <DividerH text={"Social Links"} />

      <InputGroup className="flex-column flex-md-row gap-4">
        <Form.Group controlId="onelink-website" className="form-group">
          <Form.Label className="text-capitalize">website</Form.Label>
          <Form.Control
            type="url"
            name="website"
            defaultValue={userSocialLinks.website}
          />
        </Form.Group>
        <Form.Group controlId="onelink-linkedin" className="form-group">
          <Form.Label className="text-capitalize">LinkedIn</Form.Label>
          <Form.Control
            type="url"
            name="linkedin"
            defaultValue={userSocialLinks.linkedin}
          />
        </Form.Group>
      </InputGroup>
      <InputGroup className="flex-column flex-md-row gap-4">
        {/* <Form.Group controlId="onelink-facebook" className="form-group">
          <Form.Label className="text-capitalize">facebook</Form.Label>
          <Form.Control type="url" name="facebook" />
        </Form.Group> */}
        <Form.Group controlId="onelink-instagram" className="form-group">
          <Form.Label className="text-capitalize">instagram</Form.Label>
          <Form.Control
            type="url"
            name="instagram"
            defaultValue={userSocialLinks.instagram}
          />
        </Form.Group>
        <Form.Group controlId="onelink-twitter" className="form-group">
          <Form.Label className="text-capitalize">twitter</Form.Label>
          <Form.Control
            type="url"
            name="twitter"
            defaultValue={userSocialLinks.twitter}
          />
        </Form.Group>
      </InputGroup>

      {/* Action button */}
      <div className="d-flex">
        <Button
          type="submit"
          variant="investor"
          className="ms-auto d-flex align-items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" variant="black" />
              {"Saving..."}
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </Form>
  );
}
