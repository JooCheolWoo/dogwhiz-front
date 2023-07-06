import Axios from "./Axios";

export const AxiosTryCatch = async (options : any, successCallback : Function | null, failCallback : Function | null) => {
    try {
        const response = await Axios({ ...options });

        if (response.data.status === 0) {
            const successRes = {
                success: true,
                data: response.data.data,
            };
            successCallback && successCallback(successRes);
            return successRes;
        } else {
            const failRes = {
                success: false,
                status: response.data.status,
                message: response.data.message ? response.data.message : '요청 정보가 잘못되었습니다.',
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