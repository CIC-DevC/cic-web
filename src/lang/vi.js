export default {
  route: {
    page401: "401",
    page404: "404",
    dashboard: "Trang chủ",
    createContent: "Tạo bài viết",
    manageContent: {
      title: "Quản lý bài viết",
      edit: "Chỉnh sửa bài viết",
    },
    account: {
      title: "Cài đặt tài khoản",
      profile: "Thông tin tài khoản",
    },
    viewReport: {
      title: "Xem báo cáo",
    },
  },
  navbar: {
    profile: "Thông tin tài khoản",
    intro: "Giới thiệu công ty",
    logOut: "Đăng xuất",
  },
  error: {
    connectionlost: "Lỗi kết nối",
    unauthorized: "Bạn không có quyền truy cập",
    noMessage: "Có lỗi xảy ra",
    sessionExpired: "Vui lòng đăng nhập lại để tiếp tục phiên làm việc",
    compressFileError: "Tệp tải lên không hợp lệ",
    notImageFile: "Tệp tải lên không hợp lệ",
  },
  page: {
    unauthorizedAccess: "Không có quyền truy cập",
    unauthorizedAccessMessage: "Bạn không có quyền truy cập vào trang này.",
    back: "Quay lại",
    backToHome: "Trang chủ",
    pageNotFound: "Không thể tìm thấy trang",
    pageNotFoundMessage:
      "Vui lòng kiểm tra lại đường dẫn của bạn. Ấn vào nút dưới đây để quay trở lại trang chủ.",
  },
  button: {
    OK: "OK",
    cancel: "Hủy",
    create: "Tạo mới",
    edit: "Chỉnh sửa",
    save: "Lưu",
    search: "Tìm kiếm",
    accept: "Chấp nhận",
    reject: "Từ chối",
  },
  component: {
    imageUpload: {
      message: {
        upload: "Tải ảnh lên",
        deleteImageConfirm: "Bạn chắn chắn muốn xóa hình ảnh?",
      },
      validate: {
        importFileSize: "Vui lòng chọn hình ảnh có kích thước dưới 10MB",
      },
    },
    markdown: {
      placeholder: "Viết nội dung...",
      validate: {
        importFileSize: "Vui lòng chọn hình ảnh có kích thước dưới 10MB",
      },
    },
  },
  common: {
    formatDate: "dd/MM/yyyy",
    formatDateTime: "dd/MM/yyyy HH:mm",
    defaultTime: "08:00:00",
    formatDateMoment: "DD/MM/YYYY",
    formatDateTimeMoment: "DD/MM/YYYY HH:mm:ss",
    formatDateTimeMomentHour: "DD/MM/YYYY HH:mm",
    loading: "Đang tải...",
    noData: "Không có dữ liệu",
    atTime: "vào lúc",
  },
  dialog: {
    warning: "Cảnh báo",
    confirmMessage: "Bạn chắc chắn muốn tiếp tục thực hiện hành động này?",
  },
  notices: {
    title: {
      success: "Thành công",
      invalid: "Không hợp lệ",
      fail: "Không thành công",
    },
  },
  login: {
    title: "Đăng nhập",
    logIn: "Đăng nhập",
    email: "Email",
    password: "Mật khẩu",
    link: "Đăng nhập tài khoản",
    validate: {
      email: "Vui lòng nhập email",
      password: "Vui lòng nhập mật khẩu",
    },
    forgot: {
      title: "Quên mật khẩu",
      desc: "Vui lòng nhập địa chỉ email của tài khoản cần đặt lại mật khẩu.",
      email: "Email",
      button: "Đặt lại mật khẩu",
      link: "Quên mật khẩu?",
      successMessage:
        "Đường dẫn đặt lại mật khẩu của bạn đã được gửi. Vui lòng kiểm tra email của bạn",
      validate: {
        emailRequired: "Vui lòng nhập địa chỉ email",
        emailValid: "Địa chỉ email không hợp lệ",
      },
    },
    reset: {
      title: "Đặt lại mật khẩu",
      desc: "Vui lòng nhập mật khẩu mới.",
      password: "Mật khẩu mới",
      verify: "Xác nhận mật khẩu",
      button: "Thay đổi mật khẩu",
      successMessage: "Mật khẩu của bạn đã được thay đổi thành công",
      validate: {
        passwordRequired: "Vui lòng nhập mật khẩu mới",
        passwordInvalid: "Mật khẩu mới phải lớn hơn hoặc bằng 6 ký tự",
        confirmPasswordRequired: "Vui lòng nhập mật khẩu xác nhận",
        confirmPasswordInvalid: "Mật khẩu xác nhận không hợp lệ",
      },
    },
  },
  contentType: {
    event: "Sự kiện",
    recruitment: "Tuyển dụng",
    post: "Chia sẻ",
    document: "Tài liệu",
  },
  userType: {
    admin: "Quản trị viên",
  },
  gender: {
    male: "Nam",
    female: "Nữ",
    other: "Khác",
  },
  profile: {
    userInfo: {
      label: {
        info: "Thông tin cơ bản",
        description: "Mô tả",
        name: "Tên:",
        email: "Email:",
        phone: "Số điện thoại:",
        address: "Địa chỉ:",
      },
      button: {
        edit: "Chỉnh sửa",
        security: "Bảo mật",
      },
    },
    editUserInfo: {
      title: "Chỉnh sửa thông tin",
      label: {
        email: "Email",
        password: "Mật khẩu",
        name: "Tên người dùng",
        address: "Địa chỉ",
        phone: "Số điện thoại",
        userId: "ID",
        description: "Mô tả",
      },
      validate: {
        nameRequired: "Vui lòng nhập tên người dùng",
        phoneInvalid: "Số điện thoại không hợp lệ",
      },
      message: {
        updateUserSuccess: "Cập nhật thông tin thành công",
      },
    },
    changePassword: {
      title: "Thay đổi mật khẩu",
      label: {
        oldPassword: "Mật khẩu hiện tại",
        newPassword: "Mật khẩu mới",
        confirmPassword: "Xác nhận mật khẩu",
      },
      button: {
        change: "Đổi mật khẩu",
      },
      validate: {
        oldPasswordRequired: "Vui lòng nhập mật khẩu hiện tại",
        newPasswordRequired: "Vui lòng nhập mật khẩu mới",
        newPasswordInvalid: "Mật khẩu mới phải lớn hơn hoặc bằng 6 ký tự",
        confirmPasswordRequired: "Vui lòng nhập mật khẩu xác nhận",
        confirmPasswordInvalid: "Mật khẩu xác nhận không hợp lệ",
      },
      message: {
        changePasswordSuccess: "Thay đổi mật khẩu thành công",
      },
    },
    changeAvatar: {
      title: "Thay đổi ảnh đại diện",
      validate: {
        avatarRequired: "Vui lòng tải ảnh đại diện lên",
      },
      message: {
        changeAvatarSuccess: "Thay đổi ảnh đại diện thành công",
      },
    },
    changeCover: {
      title: "Thay đổi ảnh bìa",
      validate: {
        coverRequired: "Vui lòng tải ảnh bìa lên",
      },
      message: {
        changeCoverSuccess: "Thay đổi ảnh bìa thành công",
      },
    },
  },
  manageContent: {
    placeholder: {
      title: "Nhập tiêu đề bài viết",
      contentType: "Chọn loại bài viết",
      contentStatus: "Chọn trạng thái",
    },
    label: {
      title: "Tiêu đề",
      contentType: "Loại bài viết",
      createdAt: "Thời gian tạo",
      status: "Trạng thái",
    },
    button: {
      info: "Thông tin",
      remove: "Gỡ",
    },
  },
};
