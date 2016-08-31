/*
 * WowZa Authentication API for publishers 
 * Date : 2 June 2015
 * Author : Altanai Bisht
 * Email : tara181989@gmail.com
 * Above Solutions 
 */

package com.wowza.wms.plugin.test.ws;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.jws.*;
import javax.xml.ws.*;

import com.wowza.wms.application.*;
import com.wowza.wms.amf.*;
import com.wowza.wms.client.*;
import com.wowza.wms.module.*;
import com.wowza.wms.request.*;
import com.wowza.wms.stream.*;
import com.wowza.wms.logging.*; 
import com.wowza.wms.server.*;
import com.wowza.wms.util.ModuleUtils;
import com.wowza.wms.rtp.model.*;
import com.wowza.wms.httpstreamer.model.*;
import com.wowza.wms.httpstreamer.cupertinostreaming.httpstreamer.*;
import com.wowza.wms.httpstreamer.smoothstreaming.httpstreamer.*;

public class DCAuthmod extends ModuleBase  implements IServerNotify {

	
	
	public void onServerCreate(IServer server)
	{
		getLogger().info("ServerCreate +++++++++++++++++++++ " );
	}

	public void onServerInit(IServer server)
	{
		getLogger().info("ServerInit +++++++++++++++++++++ ");
		
	}
	
	//-------------------------------------------------------------------------------------
	
	HashMap<Integer, String> publisherClients =null;
	
	IApplicationInstance appInstance = null;
	
	/*
	 * on app start
	 */
	public void onAppStart(IApplicationInstance appInstance)
	{
		getLogger().info(" appStarted  ------" + appInstance);
		this.appInstance = appInstance;
	}
	
	//---------------------------------------------------------------------------
	
	/*
	 * on connect called when any publisher connects with server
	 */
	String userName;	
	public void onConnect(IClient client, RequestFunction function, AMFDataList params) 
	{
			
		AMFDataObj obj = params.getObject(2);	
		AMFData data = obj.get("app");
		
		getLogger().info(" connection ------"+data.toString());
		getLogger().info(" Iclient ---------"+client.toString());
		
		if(data.toString().contains("?")){
			
		 String[] paramlist = data.toString().split("&");
		 String[] userParam = paramlist[1].split("=");
		 userName = userParam[1];
		 
		getLogger().info("userName  "+ userName);
		client.getProperties().setProperty("source", "jiyo");
		
  			if(this.publisherClients==null){
					this.publisherClients = new HashMap<Integer, String>();
			}
			 
			if(this.publisherClients.get(client.getClientId())==null){
				getLogger().info("Adding authenticated user: " + userName );
				this.publisherClients.put(client.getClientId(),userName);
			} else {
				client.rejectConnection();
			}  
		}
	}
	
	/*
	 * connect accept for the publisher
	 */
	public void onConnectAccept(IClient client) 
	{
		getLogger().info("onConnectAccept: " + client.getClientId());
	}

	/*
	 * connect reject 
	 */
	public void onConnectReject(IClient client) 
	{
		getLogger().info("onConnectReject: " + client.getClientId());
	}

	
	/*
	 * function when publisher disconnects from server
	 */
	public void onDisconnect(IClient client) 
	{
		getLogger().info(" Disconnection ------"+ client.toString());
		getLogger().info(client.getClientId());
		getLogger().info("Disconnection ------ getAppInstance "+client.getAppInstance());
		getLogger().info("Disconnection ------ getApplication "+client.getApplication());
		getLogger().info("Disconnection ------ getProperties "+ client.getProperties());
		getLogger().info("Disconnection ------ getStreamType "+ client.getStreamType());
		getLogger().info("Disconnection ------ getUri "+ client.getUri());
		getLogger().info("Disconnection ------ getQueryStr "+client.getQueryStr());
		getLogger().info("Disconnection ------ getTimeRunning "+client.getTimeRunning());
		getLogger().info("Disconnection ------ publishstreams "+client.getPublishStreams());
		
		getLogger().info("Disconnection ------ stream_name "+client.getProperties().getProperty("stream_name"));
		String stream_name = (String) client.getProperties().getProperty("stream_name");
		
		getLogger().info("Disconnection ------ domain_name "+client.getProperties().getProperty("domain_name"));
		String domain_name = (String) client.getProperties().getProperty("domain_name");
		
		getLogger().info("Disconncetion ============ connecttcUrl"+ client.getProperties().getProperty("connecttcUrl"));
		getLogger().info("Disconncetion ============ connectapp"+ client.getProperties().getProperty("connectapp"));
		
		
		if(this.publisherClients!=null){
			getLogger().info(" Removing user: " + this.publisherClients.get(client.getClientId()) );
		}

/*		String stream_name = client.getUri().substring(client.getUri().lastIndexOf("/"), client.getUri().length()); 
		getLogger().info(" onDisconnect stream---------------- "+stream_name);
		
		String env ;
		WMSProperties properties;
		env = client.getQueryStr();
		properties = client.getAppInstance().getProperties();
		getLogger().info(" getDoaminName----- env "+ env);
		String domain_name= getDomain(env, properties);*/
		
		getLogger().info(" onDisconnect domain_name---------------- "+domain_name);

		  	
  		try {
			URL url=new URL(domain_name+"?stream_name="+stream_name+"&status=ended");
			getLogger().info(" jiyoServerBroadcast URL  ------"+url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");
			
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("jiyoServerBroadcast Failed : HTTP error code : "+ conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream())));

			String output;
			getLogger().info("Output from jiyoServerBroadcast Server .... \n");
			while ((output = br.readLine()) != null) {
				getLogger().info(output);
			}
			conn.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}	
	
	/*
	 * On publishing a stream by publisher 
	 */
	public void publish(IClient client, RequestFunction function, AMFDataList params)
	{
		String stream_name=null, domain_name=null;
		stream_name = extractStreamName(client, function, params); 
		getLogger().info(" Publish stream---------------- "+stream_name);

		domain_name= getDoaminName(client, params);
		getLogger().info(" Publish domain_name---------------- "+domain_name);
		
		client.getProperties().setProperty("stream_name", stream_name);
		client.getProperties().setProperty("domain_name", domain_name);
		
		try {
			URL url=new URL(domain_name+"?stream_name="+stream_name+"&status=started");

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");
			
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("jiyoServerBroadcast Failed : HTTP error code : "+ conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream())));

			String output;
			getLogger().info("Output from jiyoServerBroadcast Server .... \n");
			while ((output = br.readLine()) != null) {
				getLogger().info(output);
			}
			conn.disconnect();

		} catch (MalformedURLException e) {
			e.printStackTrace();

		} catch (IOException e) {
			e.printStackTrace();
		}
		invokePrevious(client, function, params);
	}
	


	public String extractStreamName(IClient client, RequestFunction function, AMFDataList params)
	{
		getLogger().info(" extractStreamName ---------------- "+params);
		String streamName = params.getString(PARAM1);
		if(streamName.contains("?"))
			streamName = streamName.substring(0, streamName.lastIndexOf("?"));  
		return streamName;
	}
	
	public String getDoaminName(IClient client, AMFDataList params)
	{
		String domain_name=null;
		String env ;
		WMSProperties properties;
		
		String streamname=params.getString(PARAM1);
		getLogger().info(" getDoaminName----- streamname "+ streamname);
		if(streamname.contains("?")){
			 // WMSProperties localWMSProperties = client.getAppInstance().getProperties();
			 //domain_name=localWMSProperties.getPropertyStr("jiyo"+env);
			
			  env = streamname.substring(streamname.lastIndexOf("?")+1,streamname.length()); 
			  properties = client.getAppInstance().getProperties();
			  getLogger().info(" getDoaminName----- env "+ env);
			  
			  domain_name= getDomain(env, properties);
		}else{
			getLogger().info(" getDoaminName----- default dev ");
			domain_name="http://dev.jiyo.com/publisher/broadcast-status";	
		}
		
		return domain_name;
	}
	
	/**
	 * @param env
	 * @param properties
	 * @return
	 */
	private String getDomain(String env, WMSProperties properties) {
		// TODO Auto-generated method stub
		return properties.getPropertyStr("jiyo"+env);
	}


//-----------------------------------------------------------------------------------------
	
	public void onServerShutdownStart(IServer server)
	{

	}

	public void onServerShutdownComplete(IServer server)
	{
		
	}

}