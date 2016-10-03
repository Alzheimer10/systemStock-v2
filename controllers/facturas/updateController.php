<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';
$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();

$sql="UPDATE facturas SET cliente='".$data->cliente."',ci='".$data->ci."',tlf='".$data->tlf."',cel='".$data->cel."',equipo='".$data->equipo."',otro='".$data->otro."',modelo='".$data->modelo."',codigo='".$data->serial."',bateria='".$data->bateria."',sim='".$data->sim."',tapa='".$data->tapa."',reclama_garantia='".$data->garantia."',otros='".$data->otros."',estado_carcasa='".$data->carcasaestatus."',estado_pantalla='".$data->pantallaestatus."',falla_estatus='".$data->fallaestatus."',total='".$data->total."',abono='".$data->abono."',resta='".($data->total-$data->abono)."',falla_equipo='".$data->fallaequipo."' WHERE id_orden='".$data->id."'";
$respon=$bd->ejecutar($sql);

($respon)?$array['mensaje']= "success":$array['mensaje']= "failed";

echo json_encode($array);
 ?>