<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';

$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();
$sql="SELECT * FROM facturas WHERE id_orden='".$data->id."' ";
$respon=$bd->ejecutar($sql);
if($respon)
{ 

	$x=$bd->obtener_fila($respon,0);
	$fecha = new DateTime($x['create_date']);
		$item= array('id' => $x['id_orden'],
					 'ci'=>$x['ci'],
		             'cliente'=> $x['cliente'],
		             'tlf'=>$x['tlf'],
		             'cel'=>$x['cel'],
		             'equipo'=>$x['equipo'],
		             'otro'=>$x['otro'],
		             'fallaequipo'=>$x['falla_equipo'],
		             'fallaestatus'=>$x['falla_estatus'],
		             'estadocarcasa'=>$x['estado_carcasa'],
		             'modelo'=>$x['modelo'],
		             'serial'=>$x['codigo'],
		             'bateria'=>$x['bateria'],
		             'sim'=>$x['sim'],
		             'tapa'=>$x['tapa'],
		             'garantia'=>$x['reclama_garantia'],
		             'otros'=>$x['otros'],
		             'carcasaestatus'=>$x['estado_carcasa'],
		             'pantallaestatus'=>$x['estado_pantalla'],
		             'total'=>$x['total'],
		             'abono'=>$x['abono'],
		             'resta'=>$x['resta'],
		             'fecha'=>$fecha->format('d-M-Y')
		             );
	$array['data']=$item;
	$array['mensaje']= "success";
}
else
{
$array['mensaje']= "failed";
}
echo json_encode($array);
 ?>