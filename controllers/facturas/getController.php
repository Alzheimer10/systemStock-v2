<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';

$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();
$sql="SELECT id_orden,cliente,ci,create_date,cel FROM facturas ORDER BY create_date DESC";
$respon=$bd->ejecutar($sql);
if($respon)
{ 
	while($x=$bd->obtener_fila($respon,0))
	{
		$fecha= new datetime($x['create_date']);
		$item= array('id' => $x['id_orden'],
					 'ci'=>$x['ci'],
		             'cliente'=> $x['cliente'],
		             'cel'=>$x['cel'],
		             'fecha'=>$fecha->format('d-M-Y')
		             );
		$arrayItems[]=$item;
	}
	$array['data']=$arrayItems;
	$array['mensaje']= "success";
}
else
{
$array['mensaje']= "failed";
}
//print_r($array);
echo json_encode($array);
 ?>