<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';

$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();
if(($data->name)AND($data->price) AND ($data->mount))
{

$sql="INSERT INTO inventario (name,price,mount) VALUES ('".$data->name."','".$data->price."','".$data->mount."')";
$respon=$bd->ejecutar($sql);
$sql="SELECT id FROM inventario WHERE name='".$data->name."'";
$respon=$bd->ejecutar($sql);
$x=$bd->obtener_fila($respon,0);
if($respon){
$array['mensaje']= "success";
$array['id']=$x['id'];
}
else
$array['mensaje']= "failed";

}
echo json_encode($array);
 ?>