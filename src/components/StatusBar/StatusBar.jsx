import useGenericStore from "../../store/useGenericStore";

const StatusBar = () => {
    const hardwareData = useGenericStore((state) => state.hardwareData);
    const isOnline = useGenericStore((state) => state.isOnline);

    return (
        <div className="statusBar" >
            <div>
                <p>Raspberry Pi 4 Model B</p>
                <p>Arch Linux</p>
                <p>VNC</p>
                <p>5GHz</p>
            </div>
            <div>
                <p>CPU: {hardwareData.cpu}%</p>
                <p>RAM: {hardwareData.ram}%</p>
                <p>Swap: {hardwareData.swap}%</p>
                <p>SD Card: {hardwareData.sd}%</p>
            </div>
            <div>
                <p>Online: {isOnline ? '🟢' : '🔴'}</p>
            </div>
        </div>
    );
};

export default StatusBar;