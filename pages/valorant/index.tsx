import { LoadingIcon } from "@/components/icons";
import Valobox from "@/components/valobox";
import { AppDispatch } from "@/redux/store";
import {
  fetchValorants,
  selectAllValorants,
} from "@/redux/store/valorants/valorantSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface valobox {
  displayName?: any;
  uuid?: any;
  displayIcon?: string;
  displayIconSmall?: string;
}

export default function Valorant(props: valobox) {
  const dispatch = useDispatch<AppDispatch>();
  const valorants = useSelector(selectAllValorants) as any;
  const valorantStatus = useSelector((state: any) => state.valorants.status);
  const error = useSelector((state: any) => state.valorants.error);

  useEffect(() => {
    if (valorantStatus === "idle") {
      dispatch(fetchValorants());
    }
  }, [valorantStatus, dispatch]);

  let valoagents;

  if (valorantStatus === "loading") {
    valoagents = (
      <div className="text-center flex items-center justify-center h-screen">
        <LoadingIcon />
      </div>
    );
  } else if (valorantStatus === "succeeded") {
    console.log(valorants, "valorants");
    valoagents = valorants.map((v: any) => (
      <div key={v.uuid}>
        <Valobox
          displayName={v.displayName}
          uuid={v.uuid}
          displayIconSmall={v.displayIconSmall}
        />
      </div>
    ));
  } else if (valorantStatus === "failed") {
    valoagents = (
      <div className="text-center flex items-center justify-center h-screen">
        {error}
      </div>
    );
  }
  return (
    <>
      <h1 className="text-center text-2xl mt-5 mb-5">Valorant Agents</h1>
      <div className="md:mx-[80px] mx-5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {valoagents}
      </div>
    </>
  );
}
