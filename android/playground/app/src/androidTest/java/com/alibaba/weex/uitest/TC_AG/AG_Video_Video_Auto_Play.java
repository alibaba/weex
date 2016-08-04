package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Video_Video_Auto_Play extends TestFlow {
	public AG_Video_Video_Auto_Play() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Video");
		testMap.put("testChildCaseInit", "AG_Video_Video_Auto_Play");
		testMap.put("step1",new HashMap(){
			{
				put("click", "true");
				put("screenshot", "AG_Video_Video_Auto_Play_01_true");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "false");
				put("screenshot", "AG_Video_Video_Auto_Play_02_false");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
