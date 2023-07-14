import Axios from "./Axios";

export const AxiosTryCatch = async (options, successCallback, failCallback) => {
    try {
        const response = await Axios({ ...options });
        console.log(response)

        if (response.status === 0) {
            const successRes = {
                success: true,
                data: response.data,
            };
            successCallback && successCallback(successRes);
            return successRes;
        } else {
            const failRes = {
                success: false,
                status: response.status,
                data: response.data,
                message: response.message,
            };
            failCallback && await failCallback(failRes);
            return failRes;
        }
    } catch (err) {
        const errData = {
            success: false,
            status: 500,
            message: err,
        };

        failCallback && failCallback({ data : errData });
        return errData;
    }
}