package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Video_Video_Play_Status extends TestFlow {
	public AG_Video_Video_Play_Status() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Video");
		testMap.put("testChildCaseInit", "AG_Video_Video_Play_Status");
		testMap.put("step1",new HashMap(){
			{
				put("click", "play");
				put("screenshot", "AG_Video_Video_Play_Status_01_play");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "pause");
				put("screenshot", "AG_Video_Video_Play_Status_02_pause");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
